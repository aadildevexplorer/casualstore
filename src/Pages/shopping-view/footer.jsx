import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Github,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({
      title: "Mail sent Successfully",
    });

    setEmail("");
  };

  return (
    <footer className="text-gray-700 border-t border-gray-200 bg-gray-50 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800">
      <div className="px-6 py-16 mx-auto max-w-7xl">
        {/* Top Section: Newsletter + Socials */}
        <div className="grid gap-10 mb-16 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Casual-Store
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-black dark:text-gray-400">
              Shop smarter with Casual-Store premium products, unbeatable
              prices, fast delivery, and 24/7 support. Discover what you love,
              effortlessly.
            </p>
          </div>

          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 sm:flex-row"
            >
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full px-6 py-2 text-white bg-black rounded-md sm:w-auto dark:bg-white dark:text-black hover:opacity-90"
              >
                Subscribe
              </button>
            </form>

            {/* Social Icons under Subscribe */}
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              SHOP
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://casualstore-ovy9.vercel.app/"
                  className="text-black dark:text-gray-300 hover:underline"
                >
                  Men
                </a>
              </li>
              <li>
                <a
                  href="https://casualstore-ovy9.vercel.app/"
                  className="text-black dark:text-gray-300 hover:underline"
                >
                  Women
                </a>
              </li>
              <li>
                <a
                  href="https://casualstore-ovy9.vercel.app/"
                  className="text-black dark:text-gray-300 hover:underline"
                >
                  Kids
                </a>
              </li>
              <li>
                <a
                  href="https://casualstore-ovy9.vercel.app/"
                  className="text-black dark:text-gray-300 hover:underline"
                >
                  Footwear
                </a>
              </li>
              <li>
                <a
                  href="https://casualstore-ovy9.vercel.app/"
                  className="text-black dark:text-gray-300 hover:underline"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              SUPPORT
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://aadilkhan.vercel.app/"
                  className="text-black dark:text-gray-300 hover:underline"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="https://casualstore-ovy9.vercel.app/"
                  className="text-black dark:text-gray-300 hover:underline"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="https://casualstore-ovy9.vercel.app/"
                  className="text-black dark:text-gray-300 hover:underline"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://casualstore-ovy9.vercel.app/"
                  className="text-black dark:text-gray-300 hover:underline"
                >
                  Affiliates
                </a>
              </li>
            </ul>
          </div>

          {/* Replaced Support with Follow Us On */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              FOLLOW ME
            </h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/aadildevexplorer"
                className="text-black dark:text-gray-300 hover:underline"
              >
                <Github className="w-5 h-5 hover:text-blue-600" />
              </a>

              <a
                href="https://www.instagram.com/aadilllkkkhhhaaannn/#"
                className="text-black dark:text-gray-300 hover:underline"
              >
                <Instagram className="w-5 h-5 hover:text-pink-500" />
              </a>
              <a
                href="https://www.linkedin.com/feed/"
                className="text-black dark:text-gray-300 hover:underline"
              >
                <Linkedin className="w-5 h-5 hover:text-red-500" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              CONTACT ME
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-black">
                Call:{" "}
                <a
                  href="tel:+919826046890"
                  className="text-black dark:text-gray-300 hover:underline"
                >
                  98260-46890
                </a>
              </li>
              <li className="flex items-center gap-2 text-black">
                Email:{" "}
                <a
                  href="mailto:aadilkhan04610461@gmail.com"
                  className="text-black dark:text-gray-300 hover:underline"
                >
                  aadilkhan04610461@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 mt-12 text-xs text-black border-t border-gray-200 dark:border-gray-800 sm:flex-row dark:text-gray-400">
          <div>
            © {new Date().getFullYear()} Casual-Store Inc. All rights reserved.
            <p className="flex items-center justify-center mt-3 text-sm">
              Powered by{" "}
              <a
                href="https://mdaadil.vercel.app/"
                target="_blank"
                className="p-1 ml-1 text-white rounded-md bg-primary"
              >
                Mohammad Aadil
              </a>
            </p>
          </div>
          <div className="flex gap-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLmCw9KwTMuJOlqCjSQ8StSY7qg0gMtohnqA&s"
              alt="PayPal"
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
