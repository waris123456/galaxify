import { appDatabase, get, ref, set } from "../Firebase/firebaseConfig.js";

var voteButtons = document.getElementsByClassName('voteBtn');
var userId = localStorage.getItem('UserID');
var voteNumber = 0;

const getUserVotes = () => {
    const userVoteRef = ref(appDatabase, `userVotes/${userId}`);

    return get(userVoteRef).then((userVoteSnapshot) => {
        return userVoteSnapshot.exists() ? userVoteSnapshot.val() : {};
    });
};

const updateLocalStorageAndButton = (projectName, isVoted) => {
    localStorage.setItem(`${userId}_${projectName}`, isVoted);
    localStorage.setItem('VoteNumber', voteNumber.toString());

    for (let i = 0; i < voteButtons.length; i++) {
        if (voteButtons[i].parentNode.children[0].innerHTML === projectName) {
            voteButtons[i].innerHTML = isVoted ? 'Voted' : 'Vote this Project';
            voteButtons[i].disabled = isVoted;
        }
    }
};

const handleVoteFirebase = async (event) => {
    const voteButton = event.target;
    const originalButtonText = voteButton.innerHTML;
    const projectNameToBeVoted = voteButton.parentNode.children[0].innerHTML;

    try {
        const userVotes = await getUserVotes();

        if (userVotes[projectNameToBeVoted]) {
            const unvoteConfirmation = window.confirm("You have already voted for this project. Do you want to unvote?");
            if (unvoteConfirmation) {
                await Promise.all([
                    set(ref(appDatabase, `votedProjects/${projectNameToBeVoted}`), {
                        NumberOfVotes: userVotes[projectNameToBeVoted].NumberOfVotes - 1
                    }),
                    set(ref(appDatabase, `userVotes/${userId}/${projectNameToBeVoted}`), false)
                ]);
                voteNumber--;
                updateLocalStorageAndButton(projectNameToBeVoted, false);
            } else {
                voteButton.innerHTML = originalButtonText;
            }
        } else {
            const projectRef = ref(appDatabase, `votedProjects/${projectNameToBeVoted}`);
            const snapshot = await get(projectRef);
            const currentVotes = snapshot.exists() ? snapshot.val().NumberOfVotes : 0;

            if (voteNumber < 3) {
                await Promise.all([
                    set(projectRef, { NumberOfVotes: currentVotes + 1 }),
                    set(ref(appDatabase, `userVotes/${userId}/${projectNameToBeVoted}`), true)
                ]);
                voteNumber++;
                updateLocalStorageAndButton(projectNameToBeVoted, true);
            } else {
                console.log("User has reached the maximum number of votes (3).");
                alert("You cannot vote more than 3 projects.");
                voteButton.innerHTML = originalButtonText;
            }
        }
    } catch (error) {
        console.error("Error handling vote/unvote:", error);
        voteButton.innerHTML = originalButtonText;
    }
};

// Initialize voteNumber and userVotes when the page loads
getUserVotes().then((userVotes) => {
    voteNumber = Object.values(userVotes).filter((voted) => voted).length;

    for (let i = 0; i < voteButtons.length; i++) {
        const projectName = voteButtons[i].parentNode.children[0].innerHTML;
        const isVoted = userVotes[projectName] || false;

        updateLocalStorageAndButton(projectName, isVoted);
    }
});

for (let i = 0; i < voteButtons.length; i++) {
    voteButtons[i].addEventListener('click', handleVoteFirebase);
}