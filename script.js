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

// Sample responses for demo purposes - Updated with Arogya Sanjeevani info
const responses = {
    "arogya sanjeevani": "Arogya Sanjeevani Policy Information:\n• Standard health insurance product\n• Covers hospitalization expenses\n• Pre/Post hospitalization: 30/60 days\n• Day care treatments included\n• AYUSH treatments covered\n• Ambulance charges covered\n• CIN: U10200WB1906GOI001713\n\nWould you like specific claim process details?",
    
    "health insurance": "Based on your Arogya Sanjeevani policy, you're covered for:\n• Hospitalization expenses\n• Pre and post hospitalization (30/60 days)\n• Day care procedures\n• AYUSH treatments\n• Ambulance charges\n• Room rent as per policy\n• ICU charges\n\nFor specific coverage amounts, please check your policy document.",
    
    "claim": "Arogya Sanjeevani Claim Process:\n1. Inform insurer within 24 hours of hospitalization\n2. Get pre-authorization for planned treatments\n3. Submit claim form with required documents\n4. Required docs: Hospital bills, discharge summary, diagnostic reports\n5. Claims processed within 30 days\n\nFor cashless treatment, visit network hospitals.",
    
    "coverage": "Arogya Sanjeevani Coverage Details:\n• Room rent: As per policy terms\n• ICU charges: Covered\n• Surgery and medical expenses: Covered\n• Diagnostic tests: Pre/during/post hospitalization\n• Ambulance: Up to policy limit\n• AYUSH treatments: Alternative medicine\n• Day care: Same day discharge procedures\n\nExclusions apply - check policy document.",
    
    "documents": "Required Documents for Claims:\n• Duly filled claim form\n• Original hospital bills and receipts\n• Discharge summary from hospital\n• Diagnostic and investigation reports\n• Doctor's certificates\n• Identity proof\n• Policy copy\n• Pre-authorization form (if applicable)\n\nSubmit within 30 days of discharge.",
    
    "exclusions": "Arogya Sanjeevani Exclusions:\n• Pre-existing diseases (waiting period applies)\n• Cosmetic/plastic surgery\n• Dental care (unless accidental)\n• Maternity expenses (unless optional cover)\n• Self-inflicted injuries\n• War and nuclear risks\n• Experimental treatments\n\nCheck policy document for complete exclusions list.",
    
    "network hospital": "Network Hospital Benefits:\n• Cashless treatment facility\n• Show health card at admission\n• No upfront payment required\n• Direct settlement with hospital\n• Pre-authorization may be required\n• Quality assured healthcare providers\n\nContact customer care for nearest network hospital list.",
    
    "waiting period": "Arogya Sanjeevani Waiting Periods:\n• Initial waiting period: 30 days\n• Pre-existing diseases: 24-48 months\n• Specific diseases: 12-24 months\n• Maternity: 9 months (if covered)\n\nEmergency treatments may have shorter waiting periods.",
    
    "default": "I'm your ClaimBot assistant for Arogya Sanjeevani Policy (CIN: U10200WB1906GOI001713). I can help with:\n• Policy coverage details\n• Claims process and documentation\n• Network hospitals\n• Exclusions and waiting periods\n• Premium and renewal information\n• Cashless vs reimbursement process\n\nWhat specific information do you need?"
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
