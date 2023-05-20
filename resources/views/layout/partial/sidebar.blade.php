<!-- Menu -->
<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
          <div class="app-brand demo">
            <a href="index.html" class="app-brand-link">

              <span class="app-brand-text demo menu-text fw-bolder">Bonceng Absen</span>
            </a>

            <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
              <i class="bx bx-chevron-left bx-sm align-middle"></i>
            </a>
          </div>

          <div class="menu-inner-shadow"></div>

          <ul class="menu-inner py-1">
            <!-- Dashboard -->
            {{-- <li class="menu-item {{ request()->segment(1) == 'dashboard' ? 'active' : '' }}">
              <a href="/dashboard" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Dashboard</div>
              </a>
            </li> --}}

            <li class="menu-item {{ request()->segment(1) == 'absen' ? 'active' : '' }}">
              <a href="/absen" class="menu-link">
                <i class="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Analytics">Absen</div>
              </a>
            </li>

            <li class="menu-item {{ request()->segment(1) == 'cuti' ? 'active' : '' }}">
              <a href="/cuti" class="menu-link">
                <i class="menu-icon tf-icons bx bx-dock-top"></i>
                <div data-i18n="Analytics">Cuti</div>
              </a>
            </li>

            <li class="menu-item {{ request()->segment(1) == 'divisi' ? 'active' : '' }}">
              <a href="/divisi" class="menu-link">
                <i class="menu-icon tf-icons bx bx-dock-top"></i>
                <div data-i18n="Analytics">Divisi</div>
              </a>
            </li>

            <li class="menu-item {{ request()->segment(1) == 'karyawan' ? 'active' : '' }}">
              <a href="/karyawan" class="menu-link">
                <i class="menu-icon tf-icons bx bx-dock-top"></i>
                <div data-i18n="Analytics">Karyawan</div>
              </a>
            </li>

            <!-- <li class="menu-item">
              <a href="javascript:void(0);" class="menu-link menu-toggle">
                <i class="menu-icon tf-icons bx bx-detail"></i>
                <div data-i18n="Form Elements">Setting</div>
              </a>
              <ul class="menu-sub">
                <li class="menu-item">
                  <a href="/karyawan" class="menu-link">
                    <div data-i18n="Basic Inputs">Karyawan</div>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="/divisi" class="menu-link">
                    <div data-i18n="Input groups">Divisi</div>
                  </a>
                </li>
              </ul>
            </li>

            <li class="menu-item">
              <a href="javascript:void(0);" class="menu-link menu-toggle">
                <i class="menu-icon tf-icons bx bx-lock-open-alt"></i>
                <div data-i18n="Authentications">Authentications</div>
              </a>
              <ul class="menu-sub">
                <li class="menu-item">
                  <a href="auth-login-basic.html" class="menu-link" target="_blank">
                    <div data-i18n="Basic">Login</div>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="auth-register-basic.html" class="menu-link" target="_blank">
                    <div data-i18n="Basic">Register</div>
                  </a>
                </li>
                <li class="menu-item">
                  <a href="auth-forgot-password-basic.html" class="menu-link" target="_blank">
                    <div data-i18n="Basic">Forgot Password</div>
                  </a>
                </li>
              </ul>
            </li> -->


          </ul>
        </aside>
        <!-- / Menu -->
