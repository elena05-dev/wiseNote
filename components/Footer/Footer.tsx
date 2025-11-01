import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} WiseNote. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Elena Poliakova</p>
          <p>
            Contact us:{' '}
            <a href="mailto:epolyk1970@gmail.com">epolyk1970@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
