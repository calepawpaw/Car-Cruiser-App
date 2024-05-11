function setRouter() {
  switch (window.location.pathname) {
      // If you are logged in, you can't access outside pages; redirect to dashboard
      case "/":
      case "/index.html":
      case "/register.html":
      case "/login.html":
          if (localStorage.getItem("access_token")) {
              window.location.pathname = "/main.html"; // default page when logged in
          }
          break;

      // If you are not logged in, you can't access dashboard pages; redirect to /
      case "/main.html":
      case "/admin.html":
      case "/edit.html":
      case "/edit1.html":
      case "/profile.html":
      case "/profile1.html":
      case "/notification.html":
      case "/notification1.html":
      case "/page1.html":
      case "/page2.html":
      case "/page3.html":
      case "/page4.html":
      case "/rent.html":
      case "/transaction.html":
      case "/transaction1.html":
          if (!localStorage.getItem("access_token")) {
              window.location.pathname = "/index.html"; // redirect to home page if not logged in
          }
          break;
          
          case "/admin.html":
          case "/edit1.html":
          case "/profile1.html":
          case "/notification1.html":
          case "/transaction1.html":
            // Check if the user is not an admin
            if (localStorage.getItem("role") !== "admin") {
              // Redirect non-admin users to main.html
              window.location.pathname = "/main.html";
            }
            break;

      default:
          break;
  }
}

export { setRouter };