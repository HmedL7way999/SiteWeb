const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

const style = document.createElement('style');
style.textContent = `
    .section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

function createStars() {
    const starfield = document.getElementById('starfield');
    const starCount = 400;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const x = Math.random() * 100;
        const y = Math.random() * 100;

        const size = Math.random() * 2 + 1;

        const isGold = Math.random() > 0.6;
        star.style.backgroundColor = isGold ? '#d4af37' : '#ffffff';
        star.style.boxShadow = isGold ? '0 0 5px #f4d675' : '0 0 3px #ffffff';

        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.animationDelay = `${delay}s`;

        starfield.appendChild(star);
    }
}

window.addEventListener('scroll', () => {
    const starfield = document.getElementById('starfield');
    const scrollPos = window.pageYOffset;
    starfield.style.transform = `translateY(${scrollPos * 0.1}px)`;
});

createStars();

const cityCards = document.querySelectorAll('.city-card[data-audio]');
const audioMap = new Map();
let audioContextUnlocked = false;

function unlockAudio() {
    if (audioContextUnlocked) return;
    audioContextUnlocked = true;
    console.log("🎵 Audio débloqué par l'utilisateur !");
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
}

window.addEventListener('click', unlockAudio);
window.addEventListener('touchstart', unlockAudio);

cityCards.forEach(card => {
    const audioSrc = card.getAttribute('data-audio');
    if (audioSrc) {
        const audio = new Audio(audioSrc);
        audio.loop = true;
        audio.volume = 0.5;
        audioMap.set(card, audio);

        card.addEventListener('mouseenter', () => {
            const sound = audioMap.get(card);
            if (sound) {
                sound.play().catch(err => {
                    console.warn(`Lecture bloquée pour ${audioSrc}. Cliquez n'importe où sur le site pour activer le son.`);
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            const sound = audioMap.get(card);
            if (sound) {
                sound.pause();
                sound.currentTime = 0;
            }
        });
    }
});

console.log('✨ Galaxie de Lilya déployée avec 400 étoiles !');
console.log('🎵 Système audio prêt. Ajoutez "miami.mp3", "puertorico.mp3" et "essaouira.mp3" pour l\'ambiance !');

/* ================================
   Distance Page Logic
   ================================ */

function initDistancePage() {
    // 1. Clocks Logic
    const bostonClock = document.querySelector('#clock-boston .time-display');
    const fezClock = document.querySelector('#clock-fez .time-display');
    const bostonDate = document.querySelector('#clock-boston .date-display');
    const fezDate = document.querySelector('#clock-fez .date-display');

    if (bostonClock && fezClock) {
        function updateClocks() {
            const now = new Date();

            // Boston (America/New_York)
            const bostonTime = new Intl.DateTimeFormat('fr-FR', {
                timeZone: 'America/New_York',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(now);

            const bostonDateStr = new Intl.DateTimeFormat('fr-FR', {
                timeZone: 'America/New_York',
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            }).format(now);

            // Fez (Africa/Casablanca)
            const fezTime = new Intl.DateTimeFormat('fr-FR', {
                timeZone: 'Africa/Casablanca',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(now);

            const fezDateStr = new Intl.DateTimeFormat('fr-FR', {
                timeZone: 'Africa/Casablanca',
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            }).format(now);

            bostonClock.textContent = bostonTime;
            fezClock.textContent = fezTime;

            if (bostonDate) bostonDate.textContent = bostonDateStr;
            if (fezDate) fezDate.textContent = fezDateStr;
        }

        setInterval(updateClocks, 1000);
        updateClocks();
    }

    // 2. Countdown Logic (Placeholder Date: 1st July 2026)
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        // CHANGE THIS DATE to the next meeting date
        const targetDate = new Date('2026-08-04T00:00:00');

        function updateCountdown() {
            const now = new Date();
            const diff = targetDate - now;

            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

                document.getElementById('days').textContent = days.toString().padStart(2, '0');
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            } else {
                countdownEl.innerHTML = "<h3>C'est l'heure des retrouvailles ! ❤️</h3>";
            }
        }

        setInterval(updateCountdown, 60000); // Update every minute
        updateCountdown();
    }

    // 3. Daily Prompts
    const promptBox = document.getElementById('daily-prompt');
    const newPromptBtn = document.getElementById('new-prompt-btn');

    if (promptBox && newPromptBtn) {
        // Categories
        const categories = {
            'soft': [
                "Quel est ton meilleur souvenir avec moi ?",
                "Si on pouvait se téléporter maintenant, on irait où ?",
                "Quelle chanson te fait penser à moi ?",
                "Prochain date : on mange quoi ?",
                "Une chose que tu as hâte de faire ensemble ?",
                "Si on gagnait au loto, on ferait quoi en premier ?",
                "Quel film on doit absolument regarder ensemble ?",
                "Ta destination de rêve pour notre lune de miel ?",
                "C’est quoi ta définition d’un dimanche parfait ?"
            ],
            'deep': [
                "Quel est ta plus grande peur dans une relation ?",
                "Quand as-tu su que tu m'aimais ?",
                "Qu'est-ce qui me rend différent(e) de tes ex ?",
                "Une chose que tu voudrais changer chez moi ?",
                "Comment imagines-tu notre vie dans 10 ans ?",
                "Quel est le moment où tu as été le plus fier de moi ?",
                "Une chose que tu n'as jamais osé me dire ?",
                "Quelle est ta plus grande insécurité ?",
                "Qu'est-ce qui te fait te sentir le plus aimé ?"
            ],
            'spicy': [
                "Quelle partie de mon corps préfères-tu ?",
                "Ton fantasme inavoué ?",
                "La tenue dans laquelle tu me trouves le/la plus sexy ?",
                "Un endroit insolite où tu aimerais le faire ?",
                "Ce que tu aimerais que je te fasse là, tout de suite ?",
                "Plutôt dominé(e) ou dominant(e) ?",
                "Quel a été notre meilleur moment au lit selon toi ?",
                "Une chose coquine que tu veux essayer ?",
                "Si je te dis 'Jeu de rôle', tu penses à quoi ?"
            ]
        };

        let currentCat = 'soft';
        const catBtns = document.querySelectorAll('.cat-btn');

        // Logic for category switching
        catBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Visual update
                catBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Logic update
                currentCat = btn.getAttribute('data-cat');
                promptBox.innerHTML = "<p><i>Change de thème...</i></p>";

                // Auto-trigger new prompt
                setTimeout(() => {
                    generatePrompt();
                }, 300);
            });
        });

        function generatePrompt() {
            const list = categories[currentCat];
            const randomPrompt = list[Math.floor(Math.random() * list.length)];

            promptBox.style.opacity = 0;
            setTimeout(() => {
                promptBox.innerHTML = `<p>${randomPrompt}</p>`;
                promptBox.style.opacity = 1;
            }, 300);
        }

        newPromptBtn.addEventListener('click', generatePrompt);
    }

    // 4. Real-Time Love Signals (Supabase)
    const signalBtn = document.getElementById('send-signal-btn');
    const signalVisual = document.getElementById('signal-visual');
    const signalStatus = document.getElementById('signal-status');
    const identityModal = document.getElementById('identity-modal');
    const identityBtns = document.querySelectorAll('.identity-btn');

    let senderIdentity = localStorage.getItem('lilya_identity');

    // 4a. Check Identity
    if (!senderIdentity) {
        if (identityModal) identityModal.classList.remove('hidden');
    }

    if (identityBtns) {
        identityBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                senderIdentity = btn.getAttribute('data-id');
                localStorage.setItem('lilya_identity', senderIdentity);
                identityModal.classList.add('hidden');
                fetchSignals(); // Refresh count
            });
        });
    }

    // 4b. Send Signal
    if (signalBtn && signalVisual) {
        // Init fetch
        if (senderIdentity) fetchSignals();

        signalBtn.addEventListener('click', async () => {
            if (!senderIdentity) {
                identityModal.classList.remove('hidden');
                return;
            }

            // Visual feedback immediately
            signalVisual.classList.add('active');
            signalBtn.disabled = true;
            signalStatus.textContent = "Envoi en cours...";

            try {
                const { error } = await window.supabaseClient
                    .from('signals')
                    .insert([{ sender: senderIdentity }]);

                if (error) throw error;

                signalStatus.textContent = "Envoyé avec succès ! ❤️";
            } catch (err) {
                console.error("Signal Error:", err);
                signalStatus.textContent = "Erreur (mais l'intention compte)";
            }

            setTimeout(() => {
                signalVisual.classList.remove('active');
                signalBtn.disabled = false;
                if (signalStatus.textContent.includes('succès')) {
                    signalStatus.textContent = "Prêt à envoyer...";
                }
            }, 2000);
        });
    }

    // 4c. Fetch incoming signals (From the other person)
    async function fetchSignals() {
        if (!senderIdentity) return;
        const otherPerson = senderIdentity === 'Ahmed' ? 'Lilya' : 'Ahmed';

        // Get today's range
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        try {
            const { count, error } = await window.supabaseClient
                .from('signals')
                .select('*', { count: 'exact', head: true })
                .eq('sender', otherPerson)
                .gte('created_at', today.toISOString());

            if (count !== null) {
                document.querySelector('.signal-card h3').textContent = `Signal d'Amour (${count} reçus)`;
                signalStatus.textContent = `${otherPerson} t'a envoyé ${count} pensées aujourd'hui.`;
            }
        } catch (err) {
            console.log("Error fetching signals", err);
        }
    }

    // 5. Music Player
    const playerControls = document.querySelector('.player-controls');
    if (playerControls) {
        const audioPlayer = new Audio();
        const playBtn = document.getElementById('play-pause-btn');
        const vinyl = document.querySelector('.vinyl-record');
        const nowPlaying = document.querySelector('.now-playing');
        const trackBtns = document.querySelectorAll('.track-btn');
        let isPlaying = false;

        trackBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const src = btn.getAttribute('data-src');
                const title = btn.textContent;

                trackBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                audioPlayer.src = src;
                audioPlayer.play();
                isPlaying = true;
                updatePlayerState(title);
            });
        });

        playBtn.addEventListener('click', () => {
            if (!audioPlayer.src) {
                nowPlaying.textContent = "Sélectionnez une piste d'abord !";
                return;
            }

            if (audioPlayer.paused) {
                audioPlayer.play();
                isPlaying = true;
            } else {
                audioPlayer.pause();
                isPlaying = false;
            }
            updatePlayerState();
        });

        function updatePlayerState(title = null) {
            playBtn.textContent = isPlaying ? '⏸' : '▶';
            if (title) nowPlaying.textContent = `Lecture : ${title} 🎵`;

            if (isPlaying) {
                vinyl.classList.add('playing');
            } else {
                vinyl.classList.remove('playing');
            }
        }
    }

    // 6. Time Capsule (Connected to Supabase SQL)
    const capsuleInput = document.getElementById('capsule-input');
    const saveCapsuleBtn = document.getElementById('save-capsule-btn');
    const resetCapsuleBtn = document.getElementById('reset-capsule-btn');
    const lockedView = document.getElementById('locked-capsule');
    const capsuleMessage = document.getElementById('capsule-message');
    const dateDisplay = document.getElementById('capsule-date-display');

    if (saveCapsuleBtn) {
        // Init: Check if a capsule exists in DB
        checkCapsuleStatus();

        async function checkCapsuleStatus() {
            try {
                // We check the 'capsules' table ordered by latest
                const { data, error } = await window.supabaseClient
                    .from('capsules')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(1);

                if (data && data.length > 0) {
                    const latestCapsule = data[0];
                    // Format date (e.g. 2024-03-20 -> 20/03/2024)
                    const dateObj = new Date(latestCapsule.created_at);
                    const dateStr = dateObj.toLocaleDateString('fr-FR');
                    lockCapsule(dateStr);
                }
            } catch (err) {
                console.log("Supabase pas encore configuré ou vide.", err);
            }
        }

        saveCapsuleBtn.addEventListener('click', async () => {
            const message = capsuleInput.value.trim();
            if (message.length < 5) {
                capsuleMessage.textContent = "Le message est trop court !";
                return;
            }

            capsuleMessage.textContent = "Sauvegarde en cours dans le cloud...";
            saveCapsuleBtn.disabled = true;

            try {
                const { data, error } = await window.supabaseClient
                    .from('capsules')
                    .insert([{ content: message }]);

                if (error) throw error;

                const now = new Date();
                lockCapsule(now.toLocaleDateString('fr-FR'));
                capsuleInput.value = "";
                capsuleMessage.textContent = "Message scellé pour toujours ! 🔒";

            } catch (err) {
                console.error("Erreur sauvegarde:", err);
                capsuleMessage.textContent = "Erreur: Vérifiez votre connexion ou config.";
                saveCapsuleBtn.disabled = false;
            }
        });

        resetCapsuleBtn.addEventListener('click', () => {
            alert("Impossible ! C'est une vraie base de données SQL maintenant. Le message est gravé pour de vrai. (Connectez-vous à Supabase pour le supprimer si besoin)");
        });

        function lockCapsule(date) {
            capsuleInput.classList.add('hidden');
            document.querySelector('.capsule-actions').classList.add('hidden');
            lockedView.classList.remove('hidden');
            dateDisplay.textContent = date;
            capsuleMessage.textContent = "";
        }

        function unlockCapsule() {
            capsuleInput.classList.remove('hidden');
            document.querySelector('.capsule-actions').classList.remove('hidden');
            lockedView.classList.add('hidden');
        }
    }

    // 7. Smart Weather (Day/Night Aware)
    if (bostonWeather && fezWeather) {
        function getIconForTime(timezone) {
            const hour = parseInt(new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: timezone }));
            return (hour >= 6 && hour < 19) ? '☀️' : '🌙';
        }

        function updateWeather() {
            const bosTemp = Math.floor(Math.random() * (15 - 5 + 1) + 5);
            const fezTemp = Math.floor(Math.random() * (30 - 15 + 1) + 15);

            const bosIcon = getIconForTime('America/New_York');
            const fezIcon = getIconForTime('Africa/Casablanca');

            const bosElem = document.querySelector('#weather-boston');
            const fezElem = document.querySelector('#weather-fez');

            if (bosElem) {
                bosElem.querySelector('.weather-icon').textContent = bosIcon;
                bosElem.querySelector('.temp').textContent = `${bosTemp}°C`;
                bosElem.querySelector('.condition').textContent = bosIcon === '☀️' ? 'Ensoleillé' : 'Nuit Claire';
            }

            if (fezElem) {
                fezElem.querySelector('.weather-icon').textContent = fezIcon;
                fezElem.querySelector('.temp').textContent = `${fezTemp}°C`;
                fezElem.querySelector('.condition').textContent = fezIcon === '☀️' ? 'Beau temps' : 'Étoilé';
            }
            // 6. Leaderboard Logic (Game)
            async function fetchLeaderboard() {
                try {
                    // Get counts for everyone
                    const { data, error } = await window.supabaseClient
                        .from('signals')
                        .select('sender');

                    if (error) throw error;

                    let ahmedCount = 0;
                    let lilyaCount = 0;

                    data.forEach(row => {
                        if (row.sender === 'Ahmed') ahmedCount++;
                        if (row.sender === 'Lilya') lilyaCount++;
                    });

                    // Update UI
                    const ahmedEl = document.getElementById('score-ahmed');
                    const lilyaEl = document.getElementById('score-lilya');

                    if (ahmedEl) ahmedEl.textContent = ahmedCount;
                    if (lilyaEl) lilyaEl.textContent = lilyaCount;

                    // Simple win logic
                    if (ahmedCount > lilyaCount) {
                        document.querySelector('.ahmed-score').style.border = '2px solid var(--dore)';
                    } else if (lilyaCount > ahmedCount) {
                        document.querySelector('.lilya-score').style.border = '2px solid var(--dore)';
                    }

                } catch (err) {
                    console.error("Leaderboard error:", err);
                }
            }

            // Call updates
            updateCountdown();
            setInterval(updateCountdown, 60000);

            // Initial fetches
            fetchSignals();
            fetchLeaderboard();

            // Refresh leaderboard every minute
            setInterval(fetchLeaderboard, 60000);

            // 7. Interactive Particles (Heart Burst)
            document.addEventListener('click', (e) => {
                // Avoid bursting if clicking interactive elements (buttons, inputs)
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

                createHeartBurst(e.clientX, e.clientY);
            });

            function createHeartBurst(x, y) {
                for (let i = 0; i < 6; i++) {
                    const heart = document.createElement('div');
                    heart.classList.add('heart-particle');
                    heart.textContent = ['❤️', '✨', '💖', '✈️'][Math.floor(Math.random() * 4)];
                    // Random starting position offset
                    const offsetX = (Math.random() - 0.5) * 40;
                    const offsetY = (Math.random() - 0.5) * 40;

                    heart.style.left = `${x + offsetX}px`;
                    heart.style.top = `${y + offsetY}px`;

                    document.body.appendChild(heart);

                    // Cleanup
                    setTimeout(() => heart.remove(), 1500);
                }
            }
        }
    }
}

// Initialize if on appropriate page
document.addEventListener('DOMContentLoaded', initDistancePage);
