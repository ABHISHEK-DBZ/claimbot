// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Chat functionality
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Sample responses for demo purposes
const responses = {
    "health insurance": "Based on your health insurance policy, you're covered for:\n• Doctor visits with $20 copay\n• Emergency room visits\n• Prescription medications\n• Preventive care at 100%\n• Specialist visits with referral\n\nYour annual deductible is $1,500 and out-of-pocket maximum is $6,000.",
    
    "claim": "To file a claim:\n1. Contact your provider or use our online portal\n2. Provide your policy number and incident details\n3. Submit required documentation\n4. Track your claim status online\n\nClaims are typically processed within 5-10 business days.",
    
    "deductible": "Your current deductible amounts:\n• Health Insurance: $1,500 annually\n• Auto Insurance: $500 per incident\n• Home Insurance: $1,000 per claim\n\nDeductibles reset annually on your policy renewal date.",
    
    "coverage": "Your current coverage includes:\n• Health: Comprehensive medical and dental\n• Auto: Full coverage with collision and comprehensive\n• Home: Dwelling, personal property, and liability\n• Life: $250,000 term life insurance\n\nWould you like details about any specific coverage?",
    
    "default": "I understand you're asking about your insurance. Could you please be more specific? I can help with:\n• Policy coverage details\n• Claims process and status\n• Deductibles and premiums\n• Finding specific policy information\n• Explaining insurance terms"
};

// Function to add message to chat
function addMessage(content, isBot = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
    
    if (isBot) {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                ${content.replace(/\n/g, '<br>').replace(/•/g, '&bull;')}
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                ${content}
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to show typing indicator
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typing';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <span>ClaimBot is typing</span>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to remove typing indicator
function removeTyping() {
    const typing = document.getElementById('typing');
    if (typing) {
        typing.remove();
    }
}

// Function to get bot response
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    for (const key in responses) {
        if (message.includes(key)) {
            return responses[key];
        }
    }
    
    return responses.default;
}

// Function to send message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message === '') return;
    
    // Add user message
    addMessage(message, false);
    messageInput.value = '';
    
    // Show typing indicator
    showTyping();
    
    // Simulate bot response delay
    setTimeout(() => {
        removeTyping();
        const botResponse = getBotResponse(message);
        addMessage(botResponse, true);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
}

// Event listeners for sending messages
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Function for quick questions
function sendQuickQuestion(question) {
    messageInput.value = question;
    sendMessage();
}

// Function to scroll to chat section
function scrollToChat() {
    document.getElementById('chat').scrollIntoView({ behavior: 'smooth' });
}

// Clear chat function
function clearChat() {
    const messages = chatMessages.querySelectorAll('.message:not(.message:first-child)');
    messages.forEach(message => message.remove());
}

// Add clear chat functionality
document.querySelector('.btn-icon[title="Clear Chat"]').addEventListener('click', clearChat);

// Smooth scrolling for navigation links
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

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add active state to navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add loading states and error handling for future API integration
class ChatAPI {
    static async sendMessage(message) {
        // This would be your actual API call
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Return mock response for now
            return {
                success: true,
                response: getBotResponse(message)
            };
        } catch (error) {
            return {
                success: false,
                error: 'Failed to get response. Please try again.'
            };
        }
    }
}

// Enhanced send message function for future API integration
async function sendMessageWithAPI(message) {
    addMessage(message, false);
    messageInput.value = '';
    showTyping();
    
    try {
        const result = await ChatAPI.sendMessage(message);
        removeTyping();
        
        if (result.success) {
            addMessage(result.response, true);
        } else {
            addMessage('Sorry, I encountered an error. Please try again.', true);
        }
    } catch (error) {
        removeTyping();
        addMessage('Sorry, I\'m having trouble connecting. Please check your internet connection and try again.', true);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('ClaimBot UI loaded successfully!');
    
    // Focus on input when chat section comes into view
    const chatSection = document.getElementById('chat');
    const chatObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    messageInput.focus();
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    
    chatObserver.observe(chatSection);
});
