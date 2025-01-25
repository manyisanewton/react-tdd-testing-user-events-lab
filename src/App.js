import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleInterestChange = (event) => {
    const { value } = event.target;
    setInterests((prevInterests) =>
      prevInterests.includes(value)
        ? prevInterests.filter((interest) => interest !== value)
        : [...prevInterests, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    // Log for debugging
    console.log('Form Submitted!');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Interests:', interests);
  };

  return (
    <main>
      <h1>Hi, I'm newton</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <h3>Newsletter Signup</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Your name"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Your email"
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="Coding"
              onChange={handleInterestChange}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              value="Design"
              onChange={handleInterestChange}
            />
            Design
          </label>
          <label>
            <input
              type="checkbox"
              value="Marketing"
              onChange={handleInterestChange}
            />
            Marketing
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <p>
          Thank you for signing up, {name}! We've received your email ({email}) and you're interested in{' '}
          {interests.join(', ')}.
        </p>
      )}
    </main>
  );
}

export default App;
