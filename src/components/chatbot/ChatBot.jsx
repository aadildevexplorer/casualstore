import React from "react";
import { Bot, X, SendHorizontal, ChevronDown, Copy, Mic } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import logo from "../../assets/logo.png";
const ChatBot = ({
  open,
  setOpen,
  loading,
  message,
  setMessage,
  messages,
  chatRef,
  messagesEndRef,
  quickSuggestions,
  handleSend,
  sendQuickMessage,
  copyMessage,
  scrollToBottom,
  showScrollButton,
  isClosing,
  autoScroll,
  setShowMenu,
  navigate,
}) => {
  return (
    <>
      <div>
        {/* Floating Button */}
        <button
          onClick={() => setOpen(!open)}
          className="
fixed
bottom-5
right-5
z-50
h-14
w-14
rounded-full
bg-black
border
border-zinc-700
text-white
shadow-[0_10px_35px_rgba(0,0,0,.45)]
transition-all
duration-300
hover:scale-105

sm:h-16
sm:w-16
sm:bottom-6
sm:right-6
"
        >
          <Bot className="mx-auto" size={26} />
        </button>

        {open && (
          <div
            className="
fixed
z-50
flex
flex-col
overflow-hidden
border
border-zinc-800
bg-[#0B0B0B]
shadow-[0_25px_80px_rgba(0,0,0,.7)]
animate-in
fade-in
slide-in-from-bottom-5
duration-300

/* ---------- Mobile ---------- */
bottom-0
left-0
right-0
w-full
h-[100dvh]
rounded-none

/* ---------- Desktop ---------- */
sm:bottom-24
sm:right-6
sm:left-auto
sm:h-[530px]
sm:w-[400px]
sm:rounded-[28px]
"
          >
            {/* Header */}

            <div
              className="
sticky
top-0
z-20
flex
items-center
justify-between
border-b
border-zinc-800
bg-[#111111]/95
px-4
py-4
sm:px-5
backdrop-blur-md
"
            >
              {" "}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex items-center justify-center p-0.5 overflow-hidden bg-white rounded-full w-11 h-11">
                    <img
                      src={logo}
                      alt="Casual Store Logo"
                      className="object-contain w-full h-full rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="font-semibold text-white">Casual Store</h2>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 transition rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}

            <div
              ref={chatRef}
              className="chat-scroll relative flex-1 space-y-4 overflow-y-auto bg-[#090909] p-5"
            >
              {/* Quick Suggestions */}
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {quickSuggestions.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => sendQuickMessage(item)}
                      className="
        rounded-full
        border
        border-zinc-700
        bg-[#121212]
        px-4
        py-2
        text-xs
        text-zinc-300
        transition-all
        duration-200
        hover:border-white
        hover:bg-white        hover:text-black
        "
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
              {/* Messages */}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* AI Message */}

                  {msg.sender === "ai" ? (
                    <div className="flex w-[full] gap-3">
                      <div>
                        <div className="rounded-2xl border border-zinc-800 bg-[#151515] px-4 py-3 text-sm leading-5 text-white shadow">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.text}
                          </ReactMarkdown>

                          {msg.products?.length > 0 && (
                            <button
                              onClick={() => {
                                setOpen(false);

                                navigate("/shop/listing", {
                                  state: {
                                    filters: msg.filters,
                                  },
                                });
                              }}
                              className="w-full py-3 mt-4 font-medium text-black transition bg-white rounded-xl hover:bg-zinc-200"
                            >
                              🛍 View {msg.products.length} Products
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-3 pl-2 mt-1">
                          <span className="text-[10px] text-zinc-500">
                            {msg.time}
                          </span>

                          <button
                            onClick={() => copyMessage(msg.text)}
                            className="transition text-zinc-500 hover:text-white"
                          >
                            <Copy size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* User Message */

                    <div className="w-[full]">
                      <div className="px-4 py-3 text-sm leading-4 text-black bg-white shadow rounded-2xl">
                        {msg.text}
                      </div>

                      <div className="mt-1 pr-2 text-right text-[10px] text-zinc-500">
                        {msg.time}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* Typing */}
              {loading && (
                <div className="flex gap-3">
                  <div className="rounded-full border border-zinc-800 bg-[#151515] px-3 py-3">
                    <div className="flex gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>

                      <span
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: ".2s" }}
                      ></span>

                      <span
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: ".4s" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}

              {/* Scroll To Bottom */}
              {/* {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="sticky flex items-center justify-center w-10 h-10 ml-auto text-black transition bg-white rounded-full shadow-xl bottom-5 hover:scale-105"
              >
                <ChevronDown size={28} />
              </button>
            )} */}

              <div ref={messagesEndRef}></div>
            </div>

            {/* Footer */}
            <div className="p-3 sm:p-4">
              {" "}
              <div
                className="
flex
items-end
min-h-[50px]
max-h-[120px]
rounded-[28px]
border
border-white
bg-[#0F0F10]
px-4
py-2
transition-all
duration-200
focus-within:border-zinc-400
"
              >
                <textarea
                  ref={(el) => {
                    if (el) {
                      el.style.height = "0px";
                      el.style.height = `${el.scrollHeight}px`;
                    }
                  }}
                  rows={1}
                  value={message}
                  placeholder="How can I help you shop today?"
                  onChange={(e) => {
                    setMessage(e.target.value);

                    e.target.style.height = "0px";
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="
    flex-1
    bg-transparent
    text-sm
    leading-6
    text-white
    placeholder:text-zinc-500
    border-none
    outline-none
    resize-none
    overflow-y-auto
    min-h-[24px]
    max-h-[96px]
    py-1
    pr-2
  "
                  style={{
                    scrollbarWidth: "none",
                  }}
                />
                {/* Mic Icon */}

                <button
                  type="button"
                  className="mb-1.5 ml-1 transition mb text-zinc-400 hover:text-white"
                >
                  <Mic size={18} />
                </button>

                {/* Send Button */}

                <button
                  id="send-btn"
                  disabled={loading}
                  onClick={handleSend}
                  className={`
flex
items-center
justify-center
w-8
h-8
rounded-full
transition-all ml-1
duration-300
${message.trim() ? "bg-white text-black" : "bg-zinc-800 text-zinc-400"}
hover:scale-105
disabled:opacity-50
`}
                >
                  <SendHorizontal size={15} />
                </button>
              </div>
              <div className="flex items-center justify-center mt-3">
                <span className="text-[12px] text-zinc-400">
                  Need help? Chat now or call us at{" "}
                  <span className="text-white cursor-pointer">
                    +91 9826046890
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBot;
