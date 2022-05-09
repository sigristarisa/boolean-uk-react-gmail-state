import Header from "./components/header";
import initialEmails from "./data/emails";
import "./styles/app.css";
import { useState } from "react";

const App = () => {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  const toggleHideRead = () => {
    setHideRead(!hideRead);
  };

  const handleReadEmails = (clickedEmail) => {
    const newEmailLists = emails.map((email) => {
      if (clickedEmail === email) {
        const readEmail = { ...email, read: !email.read };
        return readEmail;
      }
      return email;
    });
    setEmails(newEmailLists);
  };

  const handleStarredEmails = (clickedEmail) => {
    const newEmailLists = emails.map((email) => {
      if (clickedEmail === email) {
        const starredEmail = { ...email, starred: !email.starred };
        return starredEmail;
      }
      return email;
    });
    setEmails(newEmailLists);
  };

  const hideReadEmails = () => {
    const unreadEmails = emails.filter((email) => !email.read);
    return hideRead ? unreadEmails : emails;
  };

  const showUnreadNum = () => {
    const unreadEmails = emails.filter((email) => !email.read);
    return unreadEmails.length;
  };

  const showStarredNum = () => {
    const unreadEmails = emails.filter((email) => email.starred);
    return unreadEmails.length;
  };

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">{showUnreadNum()}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{showStarredNum()}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="#hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => toggleHideRead()}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {hideReadEmails().map((email) => {
            return (
              <li
                className={email.read ? "email read" : "email unread"}
                key={email.id}
              >
                <div className="select">
                  <input
                    className="select-checkbox"
                    type="checkbox"
                    checked={email.read ? true : false}
                    onChange={() => handleReadEmails(email)}
                  />
                </div>
                <div className="star">
                  <input
                    className="star-checkbox"
                    type="checkbox"
                    checked={email.starred ? true : false}
                    onChange={() => handleStarredEmails(email)}
                  />
                </div>
                <div className="sender">{email.sender}</div>
                <div className="title">{email.title}</div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default App;
