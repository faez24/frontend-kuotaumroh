/**
 * Shared Header Component for Kuotaumroh.id
 *
 * Usage:
 * 1. Include this script in your HTML: <script src="shared/header.js"></script>
 * 2. Add a placeholder div: <div id="app-header"></div>
 * 3. Call renderHeader() when your Alpine.js app initializes
 *
 * Example:
 * init() {
 *   renderHeader('profile'); // Pass current page name to highlight it
 * }
 */

function renderHeader(currentPage = '') {
  const headerHTML = `
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur" x-data="headerComponent('${currentPage}')">
      <div class="container mx-auto flex h-16 items-center justify-between px-4">
        <!-- Logo -->
        <a href="dashboard.html" class="flex items-center gap-2">
          <img
            src="public/images/kabah.png"
            alt="Kuotaumroh.id Logo"
            class="h-9 w-9 object-contain"
          >
          <span class="text-xl font-semibold">Kuotaumroh.id</span>
        </a>

        <!-- User Dropdown -->
        <div class="relative" x-data="{ open: false }">
          <button
            @click="open = !open"
            class="flex h-10 items-center gap-2 rounded-full px-3 hover:bg-muted transition-colors"
          >
            <span class="hidden text-sm font-semibold sm:inline" x-text="headerUser.name"></span>
            <div class="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              <span x-text="headerUser.initials"></span>
            </div>
          </button>

          <!-- Dropdown Menu -->
          <div
            x-show="open"
            @click.away="open = false"
            x-cloak
            class="dropdown-menu absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg"
          >
            <div class="px-3 py-3 text-sm">
              <p class="font-medium" x-text="headerUser.name"></p>
              <p class="text-xs text-muted-foreground" x-text="headerUser.email"></p>
              <p class="text-xs text-primary font-medium pt-1" x-text="headerUser.agentCode"></p>
            </div>
            <div class="h-px bg-border"></div>
            <a href="profile.html" class="flex w-full items-center px-3 py-2 text-sm hover:bg-muted ${currentPage === 'profile' ? 'bg-muted/50' : ''}">
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profil
            </a>
            <div class="h-px bg-border"></div>
            <button
              @click="handleLogout()"
              class="flex w-full items-center px-3 py-2 text-sm text-destructive hover:bg-muted"
            >
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Keluar
            </button>
          </div>
        </div>
      </div>
    </header>
  `;

  // Insert header into the placeholder
  const headerContainer = document.getElementById('app-header');
  if (headerContainer) {
    headerContainer.innerHTML = headerHTML;
    
    // Force Alpine to recognize the new component
    if (window.Alpine) {
      window.Alpine.initTree(headerContainer);
    }
  } else {
    console.error('Header container (#app-header) not found. Please add <div id="app-header"></div> to your HTML.');
  }
}

// Header Alpine.js component
function headerComponent(currentPage) {
  return {
    currentPage: currentPage,
    headerUser: {
      name: '',
      email: '',
      initials: '',
      agentCode: ''
    },

    getInitials(name) {
      if (!name) return '';
      const parts = name.trim().split(' ');
      if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
      }
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    },

    handleLogout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    },

    init() {
      // Get user from localStorage
      const user = getUser();
      if (user) {
        this.headerUser = {
          name: user.name || '',
          email: user.email || '',
          agentCode: user.agentCode || '',
          initials: this.getInitials(user.name || '')
        };
      }
    }
  };
}

// Alternative: Auto-render on DOMContentLoaded if data-auto-render attribute is present
document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('app-header');
  if (headerContainer && headerContainer.hasAttribute('data-auto-render')) {
    const currentPage = headerContainer.getAttribute('data-current-page') || '';
    renderHeader(currentPage);
  }
});
