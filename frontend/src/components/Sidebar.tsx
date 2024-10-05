'use client';

import React, { useState, useEffect } from "react";
import menuItems from "../data/sidebar.json";
import { useRouter } from "next/navigation"; // Note que `next/navigation` é a versão correta para o roteador no Next 13+
import Cookies from "js-cookie";

const Sidebar = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false); // Novo estado para verificar se o componente foi montado no lado do cliente
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Marca como client-side após o componente ser montado
  }, []);

  const handleSectionToggle = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((item) => item !== section)
        : [...prev, section]
    );
  };

  const handleNavigation = (action: string) => {
    if (isClient) { // Verifica se estamos no client-side antes de chamar o router
      router.push(action);
    }
  };

  const handleSignOut = () => {
    Cookies.remove("token"); // Remove o token dos cookies
    if (isClient) {
      router.push("/login"); // Redireciona para a página de login
    }
  };

  if (!isClient) {
    return null; // Evita renderizar o componente no lado do servidor
  }

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen fixed">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Nome do Usuário</h2>
        <button
          onClick={handleSignOut}
          className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <nav className="mt-6">
        {menuItems.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => handleSectionToggle(section.title)}
              className="flex justify-between w-full p-4 hover:bg-gray-700"
            >
              <span>{section.title}</span>
              <span>{openSections.includes(section.title) ? "▼" : "▶"}</span>
            </button>
            {openSections.includes(section.title) && (
              <ul className="pl-6">
                {section.items.map((item) => (
                  <li
                    key={item.text}
                    className="py-2 cursor-pointer hover:bg-gray-700"
                    onClick={() => handleNavigation(item.action)}
                  >
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
