import { Coins, Github, Twitter, MessageCircle, FileText } from 'lucide-react';

const socialLinks = [
  {
    href: '#',
    icon: Github,
    hover: 'hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700',
    color: 'group-hover:text-gray-900 dark:group-hover:text-gray-100',
  },
  {
    href: '#',
    icon: Twitter,
    hover: 'hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30',
    color: 'group-hover:text-blue-500 dark:group-hover:text-blue-400',
  },
  {
    href: '#',
    icon: MessageCircle,
    hover: 'hover:border-green-300 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/30',
    color: 'group-hover:text-green-500 dark:group-hover:text-green-400',
  },
  {
    href: '#',
    icon: FileText,
    hover: 'hover:border-purple-300 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30',
    color: 'group-hover:text-purple-500 dark:group-hover:text-purple-400',
  },
];

export const AppFooter = () => {
  return (
    <footer className="relative py-16 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid layout */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <section className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                FundCycle Protocol
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
              Revolutionizing group savings through decentralized technology.
              Join the future of community-driven financial growth on Solana.
            </p>
          </section>

          {/* Links */}
          <nav>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'How it Works', 'Security', 'FAQs'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Community */}
          <section>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Community</h4>
            <div className="flex space-x-4 md:flex-wrap md:gap-3 lg:flex-row lg:gap-1 ">
              {socialLinks.map(({ href, icon: Icon, hover, color }) => (
                <a
                  key={href}
                  href={href}
                  className={`w-10 h-10 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 flex items-center justify-center transition-all duration-300 group shadow-sm hover:shadow-md ${hover}`}
                >
                  <Icon
                    className={`w-5 h-5  text-gray-600 dark:text-gray-300 transition-colors duration-300 ${color}`}
                  />
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-center dark:text-gray-300 text-sm">
            © 2025 FundCycle Protocol. All rights reserved.
          </p>
          <div className="flex space-x-2 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
