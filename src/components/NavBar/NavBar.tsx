import Link from "next/link";

const NavBar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 px-12 bg-gray-goo text-white bg-slate-600">
      <section className="w-20">
        <Link href="/">
          <h1>LOGO</h1>
        </Link>
      </section>
      <section className="flex gap-4" translate="no">
        <Link href="/tasks/list">
          TasksList
        </Link>
        <Link href="/tasks/create">
          Create Task
        </Link>
      </section>
    </nav>
  );
}

export default NavBar