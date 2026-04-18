const gifStages = [
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDB4emRxdTNoN2lpeGIwZXllOTE0cjN1OGxub2YwZ2g0c2xxdzR2NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OpdTzOY2e4jInw2Vkk/giphy.gif",    // 0 normal
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2R6Nmlhd2Z6dXd0ZTg3MzB5ZGFjcDMyZXZwNngya252Zmt1djByeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rScYNt7cl8I4lKSQVW/giphy.gif",  // 1 confused
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWUwaTVqcmNybHdzNjlidTh2NmExOWo4ZmxwYnY3M3JocXFqOWxnbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Jy8LT2ryo6rI6iDewc/giphy.gif",             // 2 pleading
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjN2OHhkdjIxem1ia3owbm91cmUyanRsY2dhODF3eWFhemdvYmh3NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7y3CfUclWw1T1nSV74/giphy.gif",             // 3 sad
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWdveHFxNDVmanh1Y21xejZmczJ3a3o5aW9rMGMzMnVpYnFqZHp4NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4zUmRD2x9vl06ltMXd/giphy.gif",       // 4 sadder
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTg5cTF4Z2hoNnRqcHM4dWdnZXc1M2tnenNwamM0MWNkMDAycHZxZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MTp7DtQJxkXKziaBEZ/giphy.gif",             // 5 devastated
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHVnNjAxeHB2czY5NW5neXQ3OG0wNjhrd2h2eGd4bmNjejN0dmo5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yV1anhmcHNQc6bc2R4/giphy.gif",               // 6 very devastated
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHVnNjAxeHB2czY5NW5neXQ3OG0wNjhrd2h2eGd4bmNjejN0dmo5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yV1anhmcHNQc6bc2R4/giphy.gif"  // 7 crying runaway
]

const noMessages = [
    "No",
    "Are you sure? 🤔",
    "Gliculi please... 🥺",
    "If you say no, I will be really sad...",
    "Im getting really sad... 😢",
    "Please??? 💔",
    "Don't do this to me...",
    "Last chance! 😭",
    "You can't catch me anyway 😜"
]

const yesTeasePokes = [
    "just try saying no first... Or you dont want to know what happens 😏",
    "c'mon, hit no... just once 👀",
    "princesss, cmonnn 😈",
    "click no, I dare you 😏"
]

let yesTeasedCount = 0

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// Autoplay: audio starts muted (bypasses browser policy), unmute immediately
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    // Fallback: unmute on first interaction
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

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
  document.querySelector('h1').innerHTML = 'Yess, Im so happy my princess 💝';
  document.querySelector('#cat-gif').src = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnpvOHJsZTVyM2g4dGg4cHZpcGR5bWp0c2t0bHY2Nzd4aXAycWdoNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PNgCafbCVDPgpJj8xS/giphy.gif';
  document.querySelector('.buttons').style.display = 'none';

  const tease = document.getElementById('tease-toast');
  if (tease) tease.style.display = 'none';

  if (!document.querySelector('.yes-message')) {
    const msg = document.createElement('p');
    msg.className = 'yes-message';
    msg.innerHTML = 'Agapi mo 💝';
    document.querySelector('.container').appendChild(msg);
  }
    confetti({ particleCount: 150, spread: 100, origin: { x: 0.5, y: 0.3 } });
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

    // Cycle through guilt-trip messages
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Grow the Yes button bigger each time
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Shrink No button to contrast
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Swap cat GIF through stages
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Runaway starts at click 5
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
