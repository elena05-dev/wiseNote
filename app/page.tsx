import css from './Home.module.css';

export default function HomePage() {
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to WiseNote</h1>
        <p className={css.description}>
          WiseNote is a minimalist and intuitive application designed for
          managing personal notes. It helps you keep your ideas, tasks, and
          thoughts organized in one convenient place, whether you&apos;re at
          home, at work, or on the go.
        </p>
        <p className={css.description}>
          With a clean interface and seamless navigation, WiseNote allows you to
          quickly create, edit, and browse notes. Stay productive and maintain
          clarity with support for keyword search, tags, and structured
          organization.
        </p>
      </div>
    </main>
  );
}
