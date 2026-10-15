let totalCost = 0;

// Switch between Login and Registration forms
function toggleAuth(type) {
    if (type === 'register') {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('register-box').style.display = 'block';
    } else {
        document.getElementById('register-box').style.display = 'none';
        document.getElementById('login-box').style.display = 'block';
    }
}

// Simulate Registration using LocalStorage
function register() {
    const name = document.getElementById('reg-name').value;
    const crop = document.getElementById('reg-crop').value;
    const pass = document.getElementById('reg-pass').value;

    if(name && crop && pass) {
        localStorage.setItem('farmerName', name);
        localStorage.setItem('farmerPass', pass);
        alert('Registration successful! Please log in.');
        toggleAuth('login');
    } else {
        alert('Please fill in all details.');
    }
}

// Simulate Login
function login() {
    const name = document.getElementById('login-name').value;
    const pass = document.getElementById('login-pass').value;
    const storedName = localStorage.getItem('farmerName');
    const storedPass = localStorage.getItem('farmerPass');

    // Simple validation (or allow them in if no one is registered yet for testing)
    if ((name === storedName && pass === storedPass) || (name !== "" && pass !== "")) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
        document.getElementById('welcome-msg').innerText = `Welcome, ${name}`;
    } else {
        alert('Invalid credentials.');
    }
}

// Logout functionality
function logout() {
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('auth-section').style.display = 'block';
    
    // Clear login inputs
    document.getElementById('login-name').value = '';
    document.getElementById('login-pass').value = '';
}

// Switch between Dashboard Tabs
function switchTab(tabId) {
    document.getElementById('cost-tab').style.display = 'none';
    document.getElementById('climate-tab').style.display = 'none';
    
    document.getElementById(tabId).style.display = 'block';

    const buttons = document.getElementsByClassName('tab-btn');
    for (let btn of buttons) {
        btn.classList.remove('active-tab');
    }
    event.target.classList.add('active-tab');
}

// Add Expenses to the Table
function addExpense() {
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (amount > 0) {
        const tableList = document.getElementById('expense-list');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td>${category}</td>
            <td>Ksh ${amount.toFixed(2)}</td>
        `;
        
        tableList.appendChild(newRow);

        // Update Total
        totalCost += amount;
        document.getElementById('total-amount').innerText = totalCost.toFixed(2);
        
        // Clear input
        document.getElementById('expense-amount').value = '';
    } else {
        alert('Please enter a valid amount.');
    }
}

// AI Assistant Logic

// Open or close the chat window
function toggleAIChat() {
    const chatBox = document.getElementById('ai-chat-window');
    chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
}

// Allow pressing "Enter" to send a message
function handleAIKeyPress(event) {
    if (event.key === 'Enter') {
        askAI();
    }
}

// Process the farmer's question
function askAI() {
    const inputField = document.getElementById('ai-input');
    const question = inputField.value.trim();
    if (!question) return;

    const chatBody = document.getElementById('chat-body');

    // 1. Show User's message on the screen
    const userBubble = document.createElement('div');
    userBubble.className = 'user-msg';
    userBubble.innerText = question;
    chatBody.appendChild(userBubble);
    
    // Clear input field and scroll to bottom
    inputField.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // 2. Simulate AI "typing" delay (1 second)
    setTimeout(() => {
        const aiBubble = document.createElement('div');
        aiBubble.className = 'ai-msg';
        
        // --- SIMULATED AI BRAIN ---
        // Converts question to lowercase to check for keywords
        const qLower = question.toLowerCase();
        let answer = "I am a simple AI. I recommend consulting your local agricultural extension officer. What else can I help with?";
        
        if (qLower.includes("pest") || qLower.includes("insect") || qLower.includes("aphids")) {
            answer = "To manage pests safely, identify the insect first. You can use organic neem oil for minor infestations. If costs are high, consider intercropping with repellent plants like marigolds.";
        } 
        else if (qLower.includes("fertilizer") || qLower.includes("soil") || qLower.includes("manure")) {
            answer = "To cut costs on synthetic fertilizers, start composting your farm waste. Well-rotted cow or chicken manure is an excellent, cheap alternative to boost soil fertility.";
        } 
        else if (qLower.includes("maize") || qLower.includes("corn")) {
            answer = "For maize farming, ensure you plant right before the rains start. Space your seeds about 25-30cm apart. Watch out for Fall Armyworm and apply wood ash as a cheap deterrent.";
        } 
        else if (qLower.includes("cost") || qLower.includes("expense") || qLower.includes("money")) {
            answer = "To manage costs, always track every purchase in your 'Cost Management' tab. Buying inputs in bulk or sharing machinery costs with neighboring farmers can drastically reduce your expenses.";
        }
        else if (qLower.includes("water") || qLower.includes("rain") || qLower.includes("irrigation")) {
            answer = "If rainfall is low, consider investing in a simple drip irrigation kit. It saves water and delivers nutrients directly to the roots, which is highly cost-effective in the long run.";
        }

        // Display AI response
        aiBubble.innerText = answer;
        chatBody.appendChild(aiBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
        
    }, 1000); // 1000 milliseconds = 1 second delay
}