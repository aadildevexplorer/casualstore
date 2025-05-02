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
    <footer className="bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 ">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section: Newsletter + Socials */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Casual-Store
            </h2>
            <p className="mt-2 text-sm text-black dark:text-gray-400 leading-relaxed">
              Shop smarter with Casual-Store premium products, unbeatable prices,
              fast delivery, and 24/7 support. Discover what you love,
              effortlessly.
            </p>
          </div>

          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 sm:w-auto w-full py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90"
              >
                Subscribe
              </button>
            </form>

            {/* Social Icons under Subscribe */}
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
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
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-xl">
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
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-xl">
              FOLLOW ME
            </h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/aadilllkkkhhhaaannn"
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
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-4">
              CONTACT ME
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-black">
                Call:{" "}
                <a
                  href="tel:+919826046890"
                  className="text-black  dark:text-gray-300 hover:underline"
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
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-black dark:text-gray-400 gap-4">
          <div>
            © {new Date().getFullYear()} Casual-Store Inc. All rights reserved.
            <p className="text-sm mt-3 flex items-center justify-center">
              Powered by{" "}
              <a
                href="https://aadilkhan.vercel.app/"
                target="_blank"
                className="ml-1 bg-primary p-1 text-white rounded-md"
              >
                Aadil Khan
              </a>
            </p>
          </div>
          <div className="flex gap-4">
            <img
              className="h-6"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1MUMXz1G7LSmOmsUgtpSVrB_aW4R79Lxv3g&s"
              alt=""
            />
            <img
              src="https://pngimg.com/d/mastercard_PNG16.png"
              alt="MasterCard"
              className="h-6"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLmCw9KwTMuJOlqCjSQ8StSY7qg0gMtohnqA&s"
              alt="PayPal"
              className="h-6"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5FNtLFxWODABAJtVR3ZVcsvU0mtsSIPFv5w&s"
              alt="Apple Pay"
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
