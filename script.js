document.addEventListener('DOMContentLoaded', () => {
    const profileTypeSelect = document.getElementById('profileTypeSelect');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword'); 
    const loginBtn = document.getElementById('loginBtn');
    const loginError = document.getElementById('loginError');
    if (loginEmail) loginEmail.value = 'rifat';
    if (loginPassword) loginPassword.value = '100';    
    function handleLogin() {
        const email = loginEmail.value;
        const password = loginPassword.value;
        const profileType = profileTypeSelect.value;
        loginError.textContent = '';
        loginError.classList.remove('error-message'); 
        if (email === 'rifat' && password === '100') {
            switch (profileType) {
                case 'patient':
                    showPage('patient-profile');
                    break;
                case 'doctor':
                    showPage('doctor-profile');
                    break;
                case 'admin':
                    showPage('admin-profile');
                    break;
                case 'pharmacist':
                    showPage('pharmacy-profile');
                    break;
                default:
                    loginError.textContent = 'Please select a profile type.';
                    loginError.classList.add('error-message');
            }
        } else {
            loginError.textContent = 'Invalid email or password.';
            loginError.classList.add('error-message');
        }
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
    if (loginPassword) {
        loginPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleLogin();
            }
        });
    }
    const doctorSelect = document.getElementById('doctorSelect');
    const appointmentDate = document.getElementById('appointmentDate');
    const appointmentTime = document.getElementById('appointmentTime');
    const confirmAppointmentBtn = document.getElementById('confirmAppointmentBtn');
    const appointmentMessage = document.getElementById('appointmentMessage');

    if (confirmAppointmentBtn) {
        confirmAppointmentBtn.addEventListener('click', () => {
            const selectedDoctor = doctorSelect.value;
            const date = appointmentDate.value;
            const time = appointmentTime.value;

            appointmentMessage.textContent = ''; 
            appointmentMessage.classList.remove('error-message', 'success'); 

            if (!selectedDoctor || !date || !time) {
                appointmentMessage.textContent = 'Please fill all appointment details.';
                appointmentMessage.classList.add('error-message');
            } else {
                const doctorName = selectedDoctor.split(' - ')[0];
                const fee = selectedDoctor.split(' - ')[1];
                appointmentMessage.textContent = `Appointment with ${doctorName} on ${date} at ${time} (Fee: ${fee}) confirmed! You will receive a notification shortly.`;
                appointmentMessage.classList.add('success');
                console.log(`Appointment Booked: Doctor: ${selectedDoctor}, Date: ${date}, Time: ${time}`);
                doctorSelect.value = '';
                appointmentDate.value = '';
                appointmentTime.value = '';
            }
        });
    }
    initializeDropdowns();
    initializeSlideshow();
    initializeThemeToggle();
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbotBtn = document.getElementById('close-chatbot');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const originalShowPage = typeof showPage === 'function' ? showPage : () => {};
    showPage = (pageId) => {
        originalShowPage(pageId);
        if (pageId === 'home') {
            chatbotIcon.style.display = 'flex';
        } else {
            chatbotIcon.style.display = 'none';
            chatbotContainer.classList.remove('active');
        }
    };

    if (document.getElementById('home')) {
        showPage('home');
    } else {
        const firstSection = document.querySelector('.page-section');
        if (firstSection) {
            showPage(firstSection.id);
        }
    }
    if (chatbotIcon && chatbotContainer && closeChatbotBtn && chatbotInput && chatbotSendBtn && chatbotMessages) {
        chatbotIcon.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
        });

        closeChatbotBtn.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });

        const addChatMessage = (message, sender) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            messageDiv.textContent = message;
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        };

        const generateBotResponse = (message) => {
            const lower = message.toLowerCase();
            if (lower.includes('symptoms') || lower.includes('sick')) {
                return "I'm sorry to hear that. Please describe your symptoms.";
            } else if (lower.includes('appointment') || lower.includes('book')) {
                return "You can book an appointment in the patient dashboard.";
            } else if (lower.includes('help')) {
                return "I'm here to help! What do you need assistance with?";
            } else if (lower.includes('hello') || lower.includes('hi')) {
                return "Hello! How can I assist you today?";
            } else if (lower.includes('thank you')) {
                return "You're welcome!";
            } else if (lower.includes('doctor')) {
                return "You can view our doctors in the 'Heroes' section.";
            } else if (lower.includes('pharmacy') || lower.includes('medicine')) {
                return "Do you need help with a medicine or prescription?";
            } else if (lower.includes('fever')) {
                return "Monitor your temperature. If it's high, consult a doctor.";
            } else if (lower.includes('cold')) {
                return "Rest and fluids help. See a doctor if it persists.";
            } else if (lower.includes('headache')) {
                return "Try resting and staying hydrated.";
            } else if (lower.includes('emergency')) {
                return "Please call emergency services immediately.";
            } else {
                return "I'm a bot. Can you ask a simpler or related question?";
            }
        };

        const handleChatbotSend = () => {
            const userMessage = chatbotInput.value.trim();
            if (userMessage) {
                addChatMessage(userMessage, 'user');
                chatbotInput.value = '';
                setTimeout(() => {
                    const response = generateBotResponse(userMessage);
                    addChatMessage(response, 'bot');
                }, 500);
            }
        };

        chatbotSendBtn.addEventListener('click', handleChatbotSend);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChatbotSend();
        });
    }
});
