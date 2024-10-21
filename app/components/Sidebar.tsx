import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white p-6">
      <h2 className="text-2xl font-bold mb-6">
        <Link
          href="/dashboard"
          className="flex p-1 py-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          Dashboard
        </Link>
      </h2>
      <ul>
        <li>
          <Link
            href="/dashboard/posts/create"
            className="flex p-1 py-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            Criar Novo Post
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/posts"
            className="flex p-1 py-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            Gerenciamento de Postagens
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/comments"
            className="flex p-1 py-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            Gerenciamento de Comentários
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/users"
            className="flex p-1 py-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            Gerenciamento de Usuários
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
