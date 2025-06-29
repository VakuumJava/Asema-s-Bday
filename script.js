// Инициализация частиц
particlesJS('particles-js', {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.3,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 3
            }
        }
    },
    retina_detect: true
});

// Переменные для музыки
let isMusicPlaying = false;
const music = document.getElementById('birthday-music');

// Функция переключения музыки
function toggleMusic() {
    if (isMusicPlaying) {
        music.pause();
        document.querySelector('.music-btn').innerHTML = '<i class="fas fa-music"></i> Музыка';
        isMusicPlaying = false;
    } else {
        music.play().catch(e => {
            console.log('Автовоспроизведение заблокировано браузером');
        });
        document.querySelector('.music-btn').innerHTML = '<i class="fas fa-pause"></i> Пауза';
        isMusicPlaying = true;
    }
}

// Эффект при клике на подарки
document.querySelectorAll('.gift').forEach(gift => {
    gift.addEventListener('click', function() {
        const giftType = this.dataset.gift;
        
        // Простой эффект пульсации
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // Создаем простые частицы
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.backgroundColor = this.style.background || '#667eea';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '1000';
                
                const angle = (i / 8) * 2 * Math.PI;
                const distance = 60;
                
                particle.style.transition = 'all 0.8s ease-out';
                particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
                particle.style.opacity = '0';
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 800);
            }, i * 50);
        }
        
        // Показываем сообщение в зависимости от типа подарка
        let message = '';
        switch(giftType) {
            case 'beauty':
                message = '💎 Ты прекрасна!';
                break;
            case 'luck':
                message = '⭐ Удача с тобой!';
                break;
            case 'success':
                message = '🏆 Ты добьешься успеха!';
                break;
            case 'happiness':
                message = '☀️ Будь счастлива!';
                break;
        }
        
        if (message) {
            showMessage(message);
        }
    });
});

// Функция показа сообщения
function showMessage(text) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'rgba(0, 0, 0, 0.8)';
    message.style.color = 'white';
    message.style.padding = '15px 25px';
    message.style.borderRadius = '25px';
    message.style.fontSize = '1.2rem';
    message.style.fontWeight = 'bold';
    message.style.zIndex = '1000';
    message.style.pointerEvents = 'none';
    message.style.opacity = '0';
    message.style.transition = 'opacity 0.3s ease';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 2000);
}

// Анимация появления карточки при загрузке
document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.birthday-card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.8s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 300);
});

// Простой эффект при наведении на имя
const nameElement = document.querySelector('.name');
nameElement.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'transform 0.3s ease';
});

nameElement.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// Добавляем простой звуковой эффект при клике на кнопки
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        // Создаем простой звуковой эффект
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    });
}); 