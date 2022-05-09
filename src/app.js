import Header from "./components/header";
import initialEmails from "./data/emails";
import "./styles/app.css";
import { useState } from "react";

const App = () => {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setTab] = useState("inbox");

  const unreadMails = emails.filter((email) => !email.read);

  const starredMails = emails.filter((email) => email.starred);

  const toggleHideRead = () => setHideRead(!hideRead);

  const handleReadEmails = (clickedEmail) => {
    const newEmailLists = emails.map((email) => {
      return clickedEmail === email ? { ...email, read: !email.read } : email;
    });
    setEmails(newEmailLists);
  };

  const handleStarredEmails = (clickedEmail) => {
    const newEmailLists = emails.map((email) => {
      return clickedEmail === email
        ? { ...email, starred: !email.starred }
        : email;
    });
    setEmails(newEmailLists);
  };

  const getEmails = () => {
    if (currentTab === "inbox") {
      return hideRead ? unreadMails : emails;
    }
    if (currentTab === "starred") {
      const starredUnreadMails = starredMails.filter((mail) => !mail.read);
      return hideRead ? starredUnreadMails : starredMails;
    }
  };

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={currentTab === "inbox" ? "item active" : "item"}
            onClick={() => setTab("inbox")}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadMails.length}</span>
          </li>
          <li
            className={currentTab === "starred" ? "item active" : "item"}
            onClick={() => setTab("starred")}
          >
            <span className="label">Starred</span>
            <span className="count">{starredMails.length}</span>
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
          {getEmails().map((email) => {
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
