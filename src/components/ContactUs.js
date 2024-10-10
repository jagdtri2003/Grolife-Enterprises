import React,{useState} from 'react';
import '../style/contactus.css';
import Header from './Header';
import Footer from './Footer';
import { successToast } from './ToastComponent';

function ContactUs() {

    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://api.web3forms.com/submit",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                access_key: "9faaa0f6-44fc-40e4-a0f0-b725df6c5b0d",
                name: form.name,
                email: form.email,
                subject: form.subject,
                message: form.message
            })
        });
        successToast("Query Received !")
        setForm({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        
    };
  return (
    <>
        <Header/>
        <div className="contact-us-container">
        <div className="contact-us">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Subject:</label>
                    <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        rows={4}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
        <Footer/>
    </>
  )
}

export default ContactUs