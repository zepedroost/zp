const gifStages = [
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDB4emRxdTNoN2lpeGIwZXllOTE0cjNlOGxub2YwZ2g0c2xxdzR2NyZlcDI2MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OpdTzOY2e4jInw2Vkk/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2R0amlhd226dXd0ZTg3MzB5ZGFjcDMyZXZwNmgya2S2ZmtldjByeZlcDI2MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r5cYNt7cl8I4lKSQVW/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWlaTVqcmMyBHdzNjlldTh2NmExOWo4ZmxwYnM3JocXFq0WzbcZlcDI2MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3y8lT2ryo6eI6IDewc/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdJN20HhkdjIxem1ia3owbm01cmUyanRsY2dhODF3eWFhemdvYmh3NSZlcDI2MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7y3CFUclWa1T1nSV74/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWdveHFxNDVmanh1Y21xejZmc33a3o5aW9rMGMzMnVpYnFqZHp4NSZlcDI2MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4ziWRD2x9v1061tMXd/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTg5cTF4Z2hoNnNhqcHM4dWdnZXc1M2tnenNwamM0MWNkMDAycHZxZlZlcDI2MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MTp7DTQ7xkXZia8EZ/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHVnNjAxeHB2czY5NW5neXQ3OG8wNjhrd2h2eGd4bmMjeJN0dmo5dyZlcDI2MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yV1anhmc HNQc6bc2R4/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHVnNjAxeHB2czY5NW5neXQ3OG8wNjhrd2h2eGd4bmMjeJN0dmo5dyZlcDI2MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yV1anhmc HNQc6bc2R4/giphy.gif"
]

const noMessages = [
    "No",
    "Are you sure? 🥺",
    "Gliculi please... 😔",
    "If you say no, I will be really sad...",
    "Im getting really sad... 😢",
    "Please??? 💗",
    "Don't do this to me...",
    "Last chance! 😣",
    "You can't catch me anyway 😤"
]

const yesTeasePokes = [
    "just try saying no first... Or you dont want to know what happens 😏",
    "c'mon, hit no... just once 🤞",
    "princesss, cmonnn 🥺",
    "click no, I dare you 😌"
]

let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false
let musicPlaying = false

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

music.volume = 0.3

document.addEventListener('click', function() {
    music.play().catch(() => {})
    musicPlaying = true
    document.getElementById('music-toggle').textContent = '🔊'
}, { once: true })

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function handleYesClick() {
    if (noClickCount < 5) {
        const msgIndex = Math.min(yesTeasedCount, yesTeasePokes.length - 1)
        showTeaseMessage(yesTeasePokes[msgIndex])
        yesTeasedCount++
        return
    }

    document.querySelector('h1').innerHTML = 'Yess, Im so happy my princess 💝'
    document.querySelector('#cat-gif').src = 'https://media.giphy.com/media/PNgCafbCVDPgpJj8xS/giphy.gif'
    document.querySelector('.buttons').style.display = 'none'

    const tease = document.getElementById('tease-toast')
    if (tease) tease.style.display = 'none'

    if (!document.querySelector('.yes-message')) {
        const msg = document.createElement('p')
        msg.className = 'yes-message'
        msg.innerHTML = 'Agapi mo 💝'
        document.querySelector('.container').appendChild(msg)
    }

    confetti({ particleCount: 150, spread: 100, origin: { x: 0.5, y: 0.3 } })

    if (!document.querySelector('.whatsapp-btn')) {
        const waBtn = document.createElement('a')
        waBtn.className = 'whatsapp-btn'
        waBtn.href = 'https://wa.me/351913799042?text=I+said+yes!+%F0%9F%92%9D+We%27re+having+a+great+date!'
        waBtn.target = '_blank'
        waBtn.innerHTML = '💬 Let him know you said yes!'
        document.querySelector('.container').appendChild(waBtn)
    }
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}
