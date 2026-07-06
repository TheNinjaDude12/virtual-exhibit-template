import { useState, useRef } from "react";

const QUESTIONS = [
  {
    id: 1,
    description: "You can tell a USB-C port’s capabilities from its physical appearance, much like how USB-A ports are color-coded.",
    answer: false,
    explanation: "A USB-C port refers only to the physical form of the port itself; to know what a specific port’s specification is, you’d need to consult the hardware manual of the device."
  },
  {
    id: 2,
    description: "All Thunderbolt ports are USB-C ports, but not all USB-C ports are Thunderbolt ports",
    answer: true,
    explanation: "Thunderbolt ports are a specific designation of USB-C ports tailored to high performance, capable of high-speed data transfer, and connected directly to a device’s PCIe lanes."
  },
  {
    id: 3,
    description: "Much like USB-A, USB-C still follows the standard USB specification with the exception of USB4, which is exclusive to USB-C.",
    answer: true,
    explanation: "The last shared specification between the two ports was USB 3.2; however, in 2019, USB4 was introduced and developed solely for the USB-C port; however, it is still backwards compatible with older USB 3.0 and 2.0 ports."
  },
  {
    id: 4,
    description: "USB-C was first developed in 2014 with an initial design document citing members from Intel, HP, Texas Instruments, and the USB Implementers Forum as main contributors.",
    answer: false,
    explanation: "Development of the USB-C specification began as early as 2012, with the first design of the 1.0 specification being published in 2014."
  },
  {
    id: 5,
    description: "USB-C is capable of data transfer, display in and out, and power delivery, but not audio in and out.",
    answer: false,
    explanation: "USB-C is capable of digital audio in and out."
  },

];

export default function UsbTrueOrFalseQuiz({ images }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [result, setResult] = useState(null); // "correct" | "wrong"
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(false); // For styling

  const question = QUESTIONS[currentQ];

  const resolveImg = (usbId) => {
    if (images && images[usbId]) {
      const img = images[usbId];
      return typeof img === "string" ? img : img?.src ?? String(img);
    }
    return `/src/assets/${usbId}.png`;
  };


  const handleNext = () => {
    setResult(null);
    setWrongAnswer(null);
    if (currentQ + 1 >= QUESTIONS.length) {
      setDone(true);
    } else {
      setCurrentQ(q => q + 1);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setScore(0);
    setResult(null);
    setWrongAnswer(null);
    setDone(false);
  };

  function checkCorrectAnswer(e, answer){

    e.preventDefault();

    const isCorrect = answer === question.answer
    setResult(isCorrect ? "correct" : "wrong")

    if (isCorrect) 
        setScore(s => s + 1);
    else
        setWrongAnswer(dropped);

  }


  if (done) {
    return (
      <div style={{
        background: "#111116",
        borderRadius: "16px",
        padding: "40px 32px",
        textAlign: "center",
        fontFamily: "var(--font-sans)",
      }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>
          {score === QUESTIONS.length ? "🎉" : score >= QUESTIONS.length / 2 ? "👍" : "📚"}
        </div>
        <div style={{ fontSize: "28px", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
          {score} / {QUESTIONS.length}
        </div>
        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "28px" }}>
          {score === QUESTIONS.length
            ? "Perfect score! You know your way around true or false statements!."
            : score >= QUESTIONS.length / 2
            ? "Good effort! Review the ones you missed."
            : "Keep studying — Try to study the correct information!"}
        </div>
        <button
          onClick={handleRestart}
          style={{
            background: "#378ADD",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: "#111116",
      borderRadius: "16px",
      padding: "28px 24px",
      fontFamily: "var(--font-sans)",
    }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
            Question {currentQ + 1} of {QUESTIONS.length}
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
            Score: {score}
            </span>
        </div>

        {/* Progress bar */}
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "99px", height: "4px", marginBottom: "24px" }}>
            <div style={{
            background: "#378ADD",
            height: "4px",
            borderRadius: "99px",
            width: `${((currentQ) / QUESTIONS.length) * 100}%`,
            transition: "width 0.3s ease",
            }} />
        </div>

        {/* Instruction */}
        <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "10px" }}>
            True or False Quiz
        </div>
        <div style={{ fontSize: "16px", fontWeight: "600", color: "#fff", marginBottom: "6px" }}>
            Determine if the statement below is true or false.
        </div>
        <div style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.6)",
            lineHeight: "1.6",
            marginBottom: "28px",
            padding: "14px 16px",
            background: "rgba(255,255,255,0.04)",
            borderRadius: "10px",
            borderLeft: `3px solid ${"#378ADD"}`,
        }}>
            {question.description}
        </div>


        {/* True and False Buttons */}
        <div style = {{display: "flex", gap: "14px", marginBottom: "16px"}}>

            <button onClick = {(e) => checkCorrectAnswer(e, true)}  
            
            disabled = {result}
            onMouseEnter = {() => setHoveredBtn("true")}
            onMouseLeave = {() => setHoveredBtn(null)}

            style={{
            flex: 1,
            fontSize: "15px",
            fontWeight: "bold",
            color: "#1D9E75",
            lineHeight: "1.6",
            padding: "10px 0px",
            background: hoveredBtn === "true" ? "rgba(66, 65, 65, 0.41)" : "rgba(255,255,255,0.04)",
            borderRadius: "10px",
            cursor: result ? "not-allowed" : "pointer",
            transition: "all 0.15s ease"
            }}>True</button>

            <button onClick = {(e) => checkCorrectAnswer(e, false)} 
            
            disabled = {result}
            onMouseEnter = {() => setHoveredBtn("false")}
            onMouseLeave = {() => setHoveredBtn(null)}
            
            style={{
            flex: 1,
            fontSize: "15px",
            fontWeight: "bold",
            color: "#D85A30",
            lineHeight: "1.6",
            padding: "10px 0px",
            background: hoveredBtn === "false" ? "rgba(66, 65, 65, 0.41)" : "rgba(255,255,255,0.04)",
            borderRadius: "10px",
            cursor: result ? "not-allowed" : "pointer",
            transition: "all 0.15s ease"
            }}>False</button>

        </div>


        {/* Result */}

        {result &&
            <div
                style={{
                border: result === "correct"
                    ? "2px solid #1D9E75"
                    : "2px solid #D85A30",
                borderRadius: "14px",
                padding: "24px 16px",
                textAlign: "center",
                background: result === "correct"
                    ? "rgba(29,158,117,0.08)"
                    : "rgba(216,90,48,0.08)",
                transition: "all 0.15s ease",
                marginTop: "16px",
                minHeight: "80px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                }}
            >
                {result === "correct" && (
                <>
                    <div style={{ fontSize: "22px" }}>✅</div>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#1D9E75" }}>Correct!</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                    Good job! You got it right!
                    </div>
                </>
                )}
                {result === "wrong" && (
                <>
                    <div style={{ fontSize: "22px" }}>❌</div>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#D85A30" }}>Not quite!</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                    {question.explanation}
                    </div>
                </>
                )}
            </div>
        }



        {/* Next button */}
        {result && (
            <button
            onClick={handleNext}
            style={{
                width: "100%",
                background: result === "correct" ? "#1D9E75" : "#378ADD",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "13px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "opacity 0.15s",
                marginTop: "16px"
            }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}
            >
            {currentQ + 1 >= QUESTIONS.length ? "See results →" : "Next question →"}
            </button>
        )}

    </div>
  );
}
