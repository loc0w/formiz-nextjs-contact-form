import ContactForm from './ContactForm';

export default function Page() {
  return (
    <main className="wrap">
      <h1>Contact us</h1>
      <p className="lead">This form has no backend code. Messages are delivered by Formiz to email and Telegram.</p>
      <ContactForm />
      <p className="foot">
        Powered by <a href="https://formiz.app" target="_blank" rel="noreferrer">Formiz</a>
      </p>
    </main>
  );
}
