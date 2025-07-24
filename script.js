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
    if(document.getElementById('home')) {
        showPage('home');
    } else {
        const firstSection = document.querySelector('.page-section');
        if(firstSection) {
            showPage(firstSection.id);
        }
    }
        const chatbotIcon = document.getElementById('chatbot-icon');
        const chatbotContainer = document.getElementById('chatbot-container');
        const closeChatbotBtn = document.getElementById('close-chatbot');
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotSendBtn = document.getElementById('chatbot-send-btn');
        const chatbotMessages = document.getElementById('chatbot-messages');

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
                const lowerCaseMessage = message.toLowerCase();
                if (lowerCaseMessage.includes('symptoms') || lowerCaseMessage.includes('sick')) {
                    return "I'm sorry to hear that. Please describe your symptoms in more detail, and I can suggest if you should see a doctor.";
                } else if (lowerCaseMessage.includes('appointment') || lowerCaseMessage.includes('book')) {
                    return "You can book an appointment through the 'Book an Appointment' section on the patient dashboard. Would you like me to guide you there?";
                } else if (lowerCaseMessage.includes('help') || lowerCaseMessage.includes('support')) {
                    return "I'm here to help! What specific assistance do you need?";
                } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
                    return "Hello there! How can I assist you today?";
                } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
                    return "You're welcome! Is there anything else I can help you with?";
                } else if (lowerCaseMessage.includes('doctor')) {
                    return "Are you looking for a specific doctor or a specialist? You can find a list of our doctors in the 'Heroes' section.";
                } else if (lowerCaseMessage.includes('pharmacy') || lowerCaseMessage.includes('medicine')) {
                    return "Our pharmacy services are available on-site. Do you need information about a specific medicine or prescription?";
                } else if (lowerCaseMessage.includes('fever')) {
                    return "Fever can be a symptom of many conditions. Please monitor your temperature and other symptoms. If it's high or persistent, consider consulting a doctor.";
                } else if (lowerCaseMessage.includes('cold')) {
                    return "For a common cold, rest, fluids, and over-the-counter remedies can help. If symptoms worsen or don't improve, please see a doctor.";
                } else if (lowerCaseMessage.includes('headache')) {
                    return "Headaches can have various causes. Try resting, staying hydrated, and pain relievers. If you experience severe, sudden, or unusual headaches, seek medical attention.";
                } else if (lowerCaseMessage.includes('emergency')) {
                    return "If this is a medical emergency, please use the 'Emergency Help' button on your patient dashboard or call emergency services immediately.";
                } else {
                    return "I'm a bot and might not understand complex queries. Can you rephrase your question or ask about symptoms, appointments, or general help?";
                }
            };

            const handleChatbotSend = () => {
                const userMessage = chatbotInput.value.trim();
                if (userMessage) {
                    addChatMessage(userMessage, 'user');
                    chatbotInput.value = '';

                    setTimeout(() => {
                        const botResponse = generateBotResponse(userMessage);
                        addChatMessage(botResponse, 'bot');
                    }, 500);
                }
            };

            chatbotSendBtn.addEventListener('click', handleChatbotSend);
            chatbotInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleChatbotSend();
                }
            });
        const originalShowPage = showPage;
        showPage = (pageId) => {
            originalShowPage(pageId);
            if (pageId === 'home') {
                chatbotIcon.style.display = 'flex';
            } else {
                chatbotIcon.style.display = 'none';
                chatbotContainer.classList.remove('active');
            }
        };
        if (document.getElementById('home') && document.getElementById('home').classList.contains('active')) {
            chatbotIcon.style.display = 'flex';
        } else {
            chatbotIcon.style.display = 'none';
        }
    }
});

