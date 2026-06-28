const Footer = () => (
  <footer className="bg-red-800 text-white py-10 px-6">
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-3">🩸 BloodBridge</h3>
        <p className="text-red-200 text-sm">Connecting donors with those in need. Every drop saves a life.</p>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Quick Links</h4>
        <ul className="space-y-2 text-red-200 text-sm">
          <li><a href="/">Home</a></li>
          <li><a href="/donation-requests">Donation Requests</a></li>
          <li><a href="/search">Search Donors</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Follow Us</h4>
        <div className="flex gap-4 text-red-200">
          <a href="#" className="hover:text-white">Facebook</a>
          <a href="#" className="hover:text-white">𝕏</a>
          <a href="#" className="hover:text-white">Instagram</a>
        </div>
      </div>
    </div>
    <p className="text-center text-red-300 text-sm mt-8">© 2025 BloodBridge. All rights reserved.</p>
  </footer>
);

export default Footer;