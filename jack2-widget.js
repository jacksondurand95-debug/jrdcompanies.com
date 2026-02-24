(function() {
  'use strict';

  // ─── Configuration ───────────────────────────────────────────────
  const CONFIG = {
    apiUrl: 'https://jack2-api.graydesert-4a50b810.eastus.azurecontainerapps.io/chat',
    model: 'claude-sonnet-4-20250514',
    maxTokens: 2048,
    storageKey: 'jack2_chat',
    greeting: "Hey! I'm Jack2, JRD's AI assistant. I can help with password resets, IT issues, finding info on the portal, or whatever you need. What's up?",
    systemContext: "You are Jack2, the JRD Companies employee portal AI assistant. You help employees with: password resets (direct them to the password reset page or help them submit a request to Jack), IT issues, navigating the portal, finding information about payroll/time off/uniforms, and general company questions. JRD Companies owns Holiday Stationstores #3851 in Lakeville, IN N OUT Market in Maplewood, and Durand Automotive in Maplewood. The owner is Jack Durand. Be helpful, concise, and casual. If someone needs a password reset, ask which email account and tell them you'll notify Jack."
  };

  // ─── State ───────────────────────────────────────────────────────
  let isOpen = false;
  let isWaiting = false;
  let hasUnread = false;
  let messages = [];
  let abortController = null;

  // ─── Inject Styles ──────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* Reset for widget elements */
    .jack2-widget *,
    .jack2-widget *::before,
    .jack2-widget *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Floating button */
    .jack2-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #e85d3b, #c94a2a);
      border: none;
      cursor: pointer;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(232, 93, 59, 0.4);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      animation: jack2-pulse 2.5s ease-in-out infinite;
    }
    .jack2-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 24px rgba(232, 93, 59, 0.55);
    }
    .jack2-btn:active {
      transform: scale(0.95);
    }
    .jack2-btn svg {
      width: 28px;
      height: 28px;
      fill: #ffffff;
    }

    @keyframes jack2-pulse {
      0%, 100% { box-shadow: 0 4px 16px rgba(232, 93, 59, 0.4); }
      50% { box-shadow: 0 4px 28px rgba(232, 93, 59, 0.7); }
    }

    /* Unread badge */
    .jack2-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #e85d3b;
      border: 2px solid #0a0a0a;
      display: none;
      animation: jack2-badge-pop 0.3s ease;
    }
    .jack2-badge.visible {
      display: block;
    }
    @keyframes jack2-badge-pop {
      0% { transform: scale(0); }
      60% { transform: scale(1.3); }
      100% { transform: scale(1); }
    }

    /* Chat window */
    .jack2-chat {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 400px;
      height: 550px;
      border-radius: 16px;
      overflow: hidden;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      background: #0a0a0a;
      border: 1px solid #222;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
      opacity: 0;
      transform: translateY(20px) scale(0.96);
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    .jack2-chat.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    /* Header */
    .jack2-header {
      background: #101010;
      padding: 16px 18px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #1e1e1e;
      flex-shrink: 0;
    }
    .jack2-header-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .jack2-header-title {
      font-family: 'Oswald', sans-serif;
      font-size: 18px;
      font-weight: 600;
      color: #f3eee3;
      display: flex;
      align-items: center;
      gap: 8px;
      line-height: 1.2;
    }
    .jack2-header-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #e85d3b;
      display: inline-block;
      flex-shrink: 0;
    }
    .jack2-header-subtitle {
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      color: #888;
      margin-top: 2px;
    }
    .jack2-close {
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: background 0.15s ease;
      flex-shrink: 0;
    }
    .jack2-close:hover {
      background: rgba(255,255,255,0.08);
    }
    .jack2-close svg {
      width: 18px;
      height: 18px;
      stroke: #888;
      stroke-width: 2;
      fill: none;
    }

    /* Messages area */
    .jack2-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #0a0a0a;
      scroll-behavior: smooth;
    }
    .jack2-messages::-webkit-scrollbar {
      width: 5px;
    }
    .jack2-messages::-webkit-scrollbar-track {
      background: transparent;
    }
    .jack2-messages::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 3px;
    }

    /* Message bubbles */
    .jack2-msg {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 14px;
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
      overflow-wrap: break-word;
      animation: jack2-msg-in 0.2s ease;
    }
    @keyframes jack2-msg-in {
      0% { opacity: 0; transform: translateY(6px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .jack2-msg.user {
      align-self: flex-end;
      background: #e85d3b;
      color: #1a1a1a;
      border-bottom-right-radius: 4px;
    }
    .jack2-msg.assistant {
      align-self: flex-start;
      background: #151515;
      color: #f3eee3;
      border: 1px solid #1e1e1e;
      border-bottom-left-radius: 4px;
    }

    /* Markdown-ish formatting inside messages */
    .jack2-msg strong {
      font-weight: 700;
    }
    .jack2-msg code {
      font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
      font-size: 12.5px;
      background: rgba(255,255,255,0.1);
      padding: 1px 5px;
      border-radius: 4px;
    }
    .jack2-msg.user code {
      background: rgba(0,0,0,0.15);
    }
    .jack2-msg a {
      color: inherit;
      text-decoration: underline;
    }

    /* Typing indicator */
    .jack2-typing {
      align-self: flex-start;
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 12px 18px;
      background: #151515;
      border: 1px solid #1e1e1e;
      border-radius: 14px;
      border-bottom-left-radius: 4px;
    }
    .jack2-typing-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #888;
      animation: jack2-bounce 1.4s ease-in-out infinite;
    }
    .jack2-typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .jack2-typing-dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes jack2-bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-6px); opacity: 1; }
    }

    /* Input area */
    .jack2-input-area {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      padding: 12px 14px;
      background: #101010;
      border-top: 1px solid #1e1e1e;
      flex-shrink: 0;
    }
    .jack2-input {
      flex: 1;
      resize: none;
      border: 1px solid #2a2a2a;
      border-radius: 12px;
      background: #1a1a1a;
      color: #f3eee3;
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      padding: 10px 14px;
      line-height: 1.4;
      max-height: 120px;
      min-height: 42px;
      outline: none;
      transition: border-color 0.15s ease;
    }
    .jack2-input::placeholder {
      color: #666;
    }
    .jack2-input:focus {
      border-color: #e85d3b;
    }
    .jack2-input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .jack2-send {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      border: none;
      background: linear-gradient(135deg, #e85d3b, #c94a2a);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: opacity 0.15s ease, transform 0.1s ease;
    }
    .jack2-send:hover {
      opacity: 0.9;
    }
    .jack2-send:active {
      transform: scale(0.93);
    }
    .jack2-send:disabled {
      opacity: 0.35;
      cursor: not-allowed;
      transform: none;
    }
    .jack2-send svg {
      width: 18px;
      height: 18px;
      fill: #fff;
    }

    /* Mobile responsive */
    @media (max-width: 500px) {
      .jack2-chat {
        bottom: 0;
        right: 0;
        left: 0;
        top: 20px;
        width: 100%;
        height: auto;
        border-radius: 16px 16px 0 0;
      }
      .jack2-btn {
        bottom: 16px;
        right: 16px;
      }
      .jack2-input {
        font-size: 16px; /* prevent zoom on iOS */
        min-height: 46px;
      }
      .jack2-send {
        width: 46px;
        height: 46px;
      }
      .jack2-close {
        width: 40px;
        height: 40px;
      }
    }
  `;
  document.head.appendChild(style);

  // ─── Build DOM ──────────────────────────────────────────────────
  const wrapper = document.createElement('div');
  wrapper.className = 'jack2-widget';

  // Floating button
  const btn = document.createElement('button');
  btn.className = 'jack2-btn';
  btn.setAttribute('aria-label', 'Open chat');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
      <path d="M7 9h10v2H7zm0-3h10v2H7z"/>
    </svg>
  `;

  const badge = document.createElement('div');
  badge.className = 'jack2-badge';
  btn.appendChild(badge);

  // Chat window
  const chat = document.createElement('div');
  chat.className = 'jack2-chat';

  // Header
  const header = document.createElement('div');
  header.className = 'jack2-header';
  header.innerHTML = `
    <div class="jack2-header-info">
      <div class="jack2-header-title">
        Jack2 <span class="jack2-header-dot"></span>
      </div>
      <div class="jack2-header-subtitle">AI Assistant</div>
    </div>
  `;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'jack2-close';
  closeBtn.setAttribute('aria-label', 'Close chat');
  closeBtn.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  `;
  header.appendChild(closeBtn);

  // Messages area
  const messagesEl = document.createElement('div');
  messagesEl.className = 'jack2-messages';

  // Input area
  const inputArea = document.createElement('div');
  inputArea.className = 'jack2-input-area';

  const input = document.createElement('textarea');
  input.className = 'jack2-input';
  input.placeholder = 'Type a message...';
  input.rows = 1;

  const sendBtn = document.createElement('button');
  sendBtn.className = 'jack2-send';
  sendBtn.setAttribute('aria-label', 'Send message');
  sendBtn.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
  `;

  inputArea.appendChild(input);
  inputArea.appendChild(sendBtn);

  chat.appendChild(header);
  chat.appendChild(messagesEl);
  chat.appendChild(inputArea);

  wrapper.appendChild(btn);
  wrapper.appendChild(chat);
  document.body.appendChild(wrapper);

  // ─── Helpers ────────────────────────────────────────────────────

  function formatMessage(text) {
    // Escape HTML
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    // Bold: **text**
    escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Inline code: `text`
    escaped = escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Newlines
    escaped = escaped.replace(/\n/g, '<br>');
    return escaped;
  }

  function scrollToBottom() {
    requestAnimationFrame(function() {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }

  function addMessageBubble(role, content) {
    var bubble = document.createElement('div');
    bubble.className = 'jack2-msg ' + role;
    bubble.innerHTML = formatMessage(content);
    messagesEl.appendChild(bubble);
    scrollToBottom();
    return bubble;
  }

  function showTyping() {
    var el = document.createElement('div');
    el.className = 'jack2-typing';
    el.id = 'jack2-typing-indicator';
    el.innerHTML = '<div class="jack2-typing-dot"></div><div class="jack2-typing-dot"></div><div class="jack2-typing-dot"></div>';
    messagesEl.appendChild(el);
    scrollToBottom();
  }

  function hideTyping() {
    var el = document.getElementById('jack2-typing-indicator');
    if (el) el.remove();
  }

  function saveSession() {
    try {
      sessionStorage.setItem(CONFIG.storageKey, JSON.stringify(messages));
    } catch(e) { /* ignore */ }
  }

  function loadSession() {
    try {
      var data = sessionStorage.getItem(CONFIG.storageKey);
      if (data) {
        messages = JSON.parse(data);
        return true;
      }
    } catch(e) { /* ignore */ }
    return false;
  }

  function renderAllMessages() {
    messagesEl.innerHTML = '';
    messages.forEach(function(msg) {
      addMessageBubble(msg.role, msg.content);
    });
  }

  function setInputEnabled(enabled) {
    isWaiting = !enabled;
    input.disabled = !enabled;
    sendBtn.disabled = !enabled;
  }

  function autoResizeInput() {
    input.style.height = 'auto';
    var scrollH = input.scrollHeight;
    var maxH = 120;
    input.style.height = Math.min(scrollH, maxH) + 'px';
  }

  // ─── Toggle Chat ────────────────────────────────────────────────

  function openChat() {
    isOpen = true;
    chat.classList.add('open');
    hasUnread = false;
    badge.classList.remove('visible');
    setTimeout(function() { input.focus(); }, 300);
  }

  function closeChat() {
    isOpen = false;
    chat.classList.remove('open');
  }

  function toggleChat() {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  }

  // ─── API Call (Streaming) ───────────────────────────────────────

  async function sendToAPI(userText) {
    setInputEnabled(false);
    showTyping();

    // Build messages array for API
    var apiMessages = [];

    // Include system context as first message on first real API call
    // We prepend the system context to the first user message
    var historyForApi = messages.filter(function(m) {
      return m.role === 'user' || m.role === 'assistant';
    });

    // Skip the greeting (first assistant message that wasn't from API)
    var startIdx = 0;
    if (historyForApi.length > 0 && historyForApi[0].role === 'assistant') {
      startIdx = 1;
    }

    for (var i = startIdx; i < historyForApi.length; i++) {
      var msg = historyForApi[i];
      if (i === startIdx && msg.role === 'user') {
        // First user message gets system context prepended
        apiMessages.push({
          role: 'user',
          content: '[System context: ' + CONFIG.systemContext + ']\n\n' + msg.content
        });
      } else {
        apiMessages.push({ role: msg.role, content: msg.content });
      }
    }

    // If somehow no system context was added (shouldn't happen, but safety check)
    if (apiMessages.length > 0 && !apiMessages[0].content.startsWith('[System context:')) {
      apiMessages[0] = {
        role: apiMessages[0].role,
        content: '[System context: ' + CONFIG.systemContext + ']\n\n' + apiMessages[0].content
      };
    }

    var body = {
      messages: apiMessages,
      model: CONFIG.model,
      stream: true,
      max_tokens: CONFIG.maxTokens
    };

    abortController = new AbortController();
    var fullResponse = '';
    var assistantBubble = null;

    try {
      var resp = await fetch(CONFIG.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: abortController.signal
      });

      if (!resp.ok) {
        throw new Error('API returned ' + resp.status);
      }

      hideTyping();

      var reader = resp.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';

      while (true) {
        var result = await reader.read();
        if (result.done) break;

        buffer += decoder.decode(result.value, { stream: true });

        // Process complete lines
        var lines = buffer.split('\n');
        // Keep the last (possibly incomplete) line in the buffer
        buffer = lines.pop() || '';

        for (var li = 0; li < lines.length; li++) {
          var line = lines[li].trim();
          if (!line) continue;

          try {
            var parsed = JSON.parse(line);
            if (parsed.content) {
              fullResponse += parsed.content;

              if (!assistantBubble) {
                assistantBubble = document.createElement('div');
                assistantBubble.className = 'jack2-msg assistant';
                messagesEl.appendChild(assistantBubble);
              }
              assistantBubble.innerHTML = formatMessage(fullResponse);
              scrollToBottom();
            }
          } catch(parseErr) {
            // Not valid JSON, skip
          }
        }
      }

      // Process any remaining buffer
      if (buffer.trim()) {
        try {
          var parsed = JSON.parse(buffer.trim());
          if (parsed.content) {
            fullResponse += parsed.content;
            if (assistantBubble) {
              assistantBubble.innerHTML = formatMessage(fullResponse);
              scrollToBottom();
            }
          }
        } catch(e) { /* skip */ }
      }

      if (fullResponse) {
        messages.push({ role: 'assistant', content: fullResponse });
        saveSession();

        // Unread badge if chat is closed
        if (!isOpen) {
          hasUnread = true;
          badge.classList.add('visible');
        }
      }

    } catch(err) {
      hideTyping();
      if (err.name !== 'AbortError') {
        var errContent = "Couldn't reach Jack2. Try again in a sec.";
        addMessageBubble('assistant', errContent);
        messages.push({ role: 'assistant', content: errContent });
        saveSession();
      }
    } finally {
      abortController = null;
      setInputEnabled(true);
      input.focus();
    }
  }

  // ─── Send Message ──────────────────────────────────────────────

  function handleSend() {
    var text = input.value.trim();
    if (!text || isWaiting) return;

    // Add user message
    messages.push({ role: 'user', content: text });
    addMessageBubble('user', text);
    saveSession();

    // Clear input
    input.value = '';
    autoResizeInput();

    // Send to API
    sendToAPI(text);
  }

  // ─── Event Listeners ───────────────────────────────────────────

  btn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', closeChat);

  sendBtn.addEventListener('click', handleSend);

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  input.addEventListener('input', autoResizeInput);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) {
      closeChat();
    }
  });

  // ─── Initialize ────────────────────────────────────────────────

  var hadSession = loadSession();

  if (hadSession && messages.length > 0) {
    renderAllMessages();
  } else {
    // Add greeting
    messages = [{ role: 'assistant', content: CONFIG.greeting }];
    addMessageBubble('assistant', CONFIG.greeting);
    saveSession();
  }

})();
