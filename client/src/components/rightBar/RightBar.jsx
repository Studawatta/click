import './rightBar.scss';

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.pinimg.com/originals/1c/a5/67/1ca567198de000e54f9d71c01dcb4e2d.jpg"
                alt="profile-image"
              />
              <span>Sandun Thisara</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          {/* ... */}
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.pinimg.com/originals/1c/a5/67/1ca567198de000e54f9d71c01dcb4e2d.jpg"
                alt="profile-image"
              />
              <span>Sandun Thisara</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          {/* ... */}
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.pinimg.com/originals/1c/a5/67/1ca567198de000e54f9d71c01dcb4e2d.jpg"
                alt="profile-image"
              />
              <p>
                <span>Sandun Thisara</span> changed their cover{' '}
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.pinimg.com/originals/1c/a5/67/1ca567198de000e54f9d71c01dcb4e2d.jpg"
                alt="profile-image"
              />
              <p>
                <span>Sandun Thisara</span> changed their cover{' '}
                <picture></picture>
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.pinimg.com/originals/1c/a5/67/1ca567198de000e54f9d71c01dcb4e2d.jpg"
                alt="profile-image"
              />
              <p>
                <span>Sandun Thisara</span> changed their cover{' '}
                <picture></picture>
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.pinimg.com/originals/1c/a5/67/1ca567198de000e54f9d71c01dcb4e2d.jpg"
                alt="profile-image"
              />
              <p>
                <span>Sandun Thisara</span> changed their cover{' '}
                <picture></picture>
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="item">
          <span>Online friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.pinimg.com/originals/1c/a5/67/1ca567198de000e54f9d71c01dcb4e2d.jpg"
                alt="profile-image"
              />
              <div className="online" />
              <span>Sandun Thisara</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.pinimg.com/originals/1c/a5/67/1ca567198de000e54f9d71c01dcb4e2d.jpg"
                alt="profile-image"
              />
              <div className="online" />
              <span>Sandun Thisara</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.pinimg.com/originals/1c/a5/67/1ca567198de000e54f9d71c01dcb4e2d.jpg"
                alt="profile-image"
              />
              <div className="online" />
              <span>Sandun Thisara</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
