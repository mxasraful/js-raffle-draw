window.onload = () => {
    const inp = document.getElementById("inp")
    const nameList = document.getElementById("name-list")
    const display = document.getElementById("display")
    const giveATryBtn = document.getElementById("giveATryBtn")
    const firstPosition = document.getElementById("firstPosition")
    const secondPosition = document.getElementById("secondPosition")
    const thirdPosition = document.getElementById("thirdPosition")

    const entryAddLabel = document.getElementById("entryAddLabel")
    const entryAddedMsg = document.getElementById("entryAddedMsg")

    const participantsName = []

    inp.addEventListener("keypress", (event) => {
        participantsName.push('')
        if (event.key === 'Enter') {
            let newNames = event.target.value.split(", ")
            console.log(newNames)
            if (newNames[0] !== "") {
                newNames.forEach(name => {
                    participantsName.push(name)
                    let item = createListItem(name)
                    nameList.appendChild(item)
                    event.target.value = ""
                    inp.style.display = "none"
                    entryAddLabel.style.display = "none"
                    entryAddedMsg.style.display = "block"
                });
            }
        }
    })

    console.log(participantsName)

    giveATryBtn.addEventListener("click", () => {
        if (participantsName.length === 0) {
            alert("There is no entry.")
        } else {
            let shuffledNames = shuffle(participantsName)
            for (let i = 0; i < shuffledNames.length; i++) {
                (
                    (i, count) => {
                        setTimeout(() => {

                            let rand = Math.floor(Math.random() * (shuffledNames.length))
                            display.innerHTML = shuffledNames[rand]

                            if (count === shuffledNames.length - 1) {
                                if (!firstPosition.innerHTML) {
                                    firstPosition.innerHTML = shuffledNames[rand]
                                    let ind = participantsName.indexOf(shuffledNames[rand])
                                    participantsName.splice(ind, 1)
                                } else if (!secondPosition.innerHTML) {
                                    secondPosition.innerHTML = shuffledNames[rand]
                                    let ind = participantsName.indexOf(shuffledNames[rand])
                                    participantsName.splice(ind, 1)
                                } else if (!thirdPosition.innerHTML) {
                                    thirdPosition.innerHTML = shuffledNames[rand]
                                    let ind = participantsName.indexOf(shuffledNames[rand])
                                    participantsName.splice(ind, 1)
                                    giveATryBtn.disabled = true
                                } else{
                                    giveATryBtn.disabled = true
                                }
                            }
                        }, i)
                    }
                )(i * 100, i)
            }
        }
    })
}

const createListItem = (name) => {
    let li = document.createElement('li')
    li.className = 'list-group-item namesListItem'
    li.innerHTML = name
    return li
}

const shuffle = (arr) => {
    let shuffleArr = [...arr]

    for (let i = shuffleArr.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1))
        let temp = shuffleArr[rand]
        shuffleArr[rand] = shuffleArr[i]
        shuffleArr[i] = temp
    }

    return shuffleArr
}