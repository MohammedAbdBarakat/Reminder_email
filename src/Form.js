import { useRef, useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

const Form = () => {
    const [toName, setToName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const [reminder, setReminder] = useState("");
    const formRef = useRef();

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const sendEmail = () => {
        let currentDate = new Date()
        let currentHours = currentDate.getHours()
        let currentMinutes = currentDate.getMinutes()
        console.log("currentHours: ",currentHours);
        console.log("currentMinutes: ",currentMinutes);

        let reminderHours = reminder.split(":")[0]
        console.log("reminderHours: ",reminderHours);
        let reminderMinutes = reminder.split(":")[1]
        console.log("reminderMinutes: ",reminderMinutes);

        let differHours = reminderHours - currentHours;
        console.log("differHours: ",differHours) 
        differHours = differHours * 60 * 60 * 1000;
        console.log("differHours in milliseconds: ",differHours) 

        let differMinutes = reminderMinutes - currentMinutes;
        console.log("differMinutes: ",differMinutes) 
        differMinutes = differMinutes * 60 * 1000;
        console.log("differMinutes in milliseconds: ",differMinutes) 

        let diffTime = differHours + differMinutes;
        console.log("diffTime in milliseconds: ",diffTime) 

        if (diffTime >= 0) {
            setError("")
            setTimeout(() => {
                emailjs.sendForm("service_ceokqdo", "template_m2jlnql", formRef.current, "544pD2BdKIuLpCCQQ")
                .then((result) => {
                    setIsLoading(false)
                    setToName("")
                    setEmail("")
                    setMessage("")
                    setSubject("")
                    setReminder("")
                    alert("Email sent successfully")
                    console.log("Email sent", result.text);
                }, (error) => {
                    setIsLoading(false)
                    console.log("Failed", error.text);
                });        
            }, diffTime);
        }
        else {
            setIsLoading(false)
            setReminder("")
            throw new Error("please enter a valid time");
        }

    }

    const handleSubmitButton = (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            sendEmail()
        } catch (error) {
            setError("Invalid time entered. Please check and try again.")
        }
    };


    return (
        <>
            <div className="wrapper">
                <form className="email-form" ref={formRef} onSubmit={handleSubmitButton}>
                    <h1>Remind your buddy!</h1>

                    <label htmlFor="to_name">To Name:</label>
                    <input
                        type="text"
                        name="to_name"
                        placeholder="Recipient's Name"
                        required
                        onChange={(e) => setToName(e.target.value)}
                        value={toName}
                    />

                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Email's Subject"
                        required
                        onChange={(e) => setSubject(e.target.value)}
                        value={subject}
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="to_email"
                        placeholder="example@example.com"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <label htmlFor="message">Your reminder message:</label>
                    <input
                        type="text"
                        name="message"
                        placeholder="Hi there! Remind sending that report."
                        required
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />

                    <label htmlFor="reminder">Choose a time:</label>
                    <input
                        type="time"
                        name="reminder"
                        onChange={(e) => setReminder(e.target.value)}
                        value={reminder}
                    />

                    {!isLoading && <button type="submit" >Send</button>}

                    {isLoading &&  <div><h1>Loading...</h1></div>}
                    {error && <div><h3>{error}</h3></div>}
                </form>
            </div>
        </>
    );
};

export default Form;
