@extends('layout.home')
@section('body_content')
    <!-- Navbar -->
<!-- Layout container -->
<!-- <div class="layout-page"> -->
<!-- Menu -->
<!-- <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
          <div class="app-brand demo">
            <a href="index.html" class="app-brand-link">

              <span class="app-brand-text demo menu-text fw-bolder">Bonceng Absen</span>
            </a>

            <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
              <i class="bx bx-chevron-left bx-sm align-middle"></i>
            </a>
          </div>

          <div class="menu-inner-shadow"></div>

          <ul class="menu-inner py-1"> -->
            <!-- Dashboard -->
            <!-- <li class="menu-item">
              <a href="/dashboard" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Dashboard</div>
              </a>
            </li>

            <li class="menu-item">
              <a href="/absen" class="menu-link">
                <i class="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Analytics">Absen</div>
              </a>
            </li>

            <li class="menu-item">
              <a href="/cuti" class="menu-link">
                <i class="menu-icon tf-icons bx bx-dock-top"></i>
                <div data-i18n="Analytics">Cuti</div>
              </a>
            </li>

            <li class="menu-item active open">
              <a href="javascript:void(0);" class="menu-link menu-toggle">
                <i class="menu-icon tf-icons bx bx-detail"></i>
                <div data-i18n="Form Elements">Setting</div>
              </a>
              <ul class="menu-sub">
                <li class="menu-item active">
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


          </ul>
        </aside> -->
        <!-- / Menu -->

    <nav
            class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                <i class="bx bx-menu bx-sm"></i>
              </a>
            </div>

            <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              <!-- Search -->
              <div class="navbar-nav align-items-center">
                <div class="nav-item d-flex align-items-center">
                  <i class="bx bx-search fs-4 lh-0"></i>
                  <input
                    type="text"
                    class="form-control border-0 shadow-none"
                    placeholder="Search..."
                    aria-label="Search..."
                  />
                </div>
              </div>
              <!-- /Search -->

              <ul class="navbar-nav flex-row align-items-center ms-auto">
                <!-- Place this tag where you want the button to render. -->
                <li class="nav-item lh-1 me-3">
                  <a
                    class="github-button"
                    href="https://github.com/themeselection/sneat-html-admin-template-free"
                    data-icon="octicon-star"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
                    >Star</a
                  >
                </li>

                <!-- User -->
                <li class="nav-item navbar-dropdown dropdown-user dropdown">
                  <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                    <div class="avatar avatar-online">
                      <img src="../assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
                    </div>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="d-flex">
                          <div class="flex-shrink-0 me-3">
                            <div class="avatar avatar-online">
                              <img src="../assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <span class="fw-semibold d-block">John Doe</span>
                            <small class="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div class="dropdown-divider"></div>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <i class="bx bx-user me-2"></i>
                        <span class="align-middle">My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <i class="bx bx-cog me-2"></i>
                        <span class="align-middle">Settings</span>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <span class="d-flex align-items-center align-middle">
                          <i class="flex-shrink-0 bx bx-credit-card me-2"></i>
                          <span class="flex-grow-1 align-middle">Billing</span>
                          <span class="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <div class="dropdown-divider"></div>
                    </li>
                    <li>
                      <a class="dropdown-item" href="auth-login-basic.html">
                        <i class="bx bx-power-off me-2"></i>
                        <span class="align-middle">Log Out</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <!--/ User -->
              </ul>
            </div>
          </nav>

          <!-- / Navbar -->

          <!-- Content wrapper -->
          <div class="content-wrapper">
            <!-- Content -->

            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"></span> Karyawan</h4>

              <!-- Hoverable Table rows -->
              <div class="card">
                <div class="card-header">
                    <div class="row">
                    <div class="col-9"></div>
                    <div class="col-3">
                        <button class="btn btn-primary" type="button" id="btnAddKar">Tambah karyawan</button>
                    </div>
                    </div>
                </div>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                    <table class="table table-hover" id="list-karyawan">
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <!-- <th>Email</th> -->
                          <th>Alamat</th>
                          <th>Divisi</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody class="table-border-bottom-0">
  
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!--/ Hoverable Table rows -->


            </div>
            <!-- / Content -->

            <!-- Footer -->
            <footer class="content-footer footer bg-footer-theme">
              <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div class="mb-2 mb-md-0">
                  ©
                  <script>
                    document.write(new Date().getFullYear());
                  </script>
                  , made with ❤️ by
                  <a href="https://themeselection.com" target="_blank" class="footer-link fw-bolder">ThemeSelection</a>
                </div>
                <div>
                  <a href="https://themeselection.com/license/" class="footer-link me-4" target="_blank">License</a>
                  <a href="https://themeselection.com/" target="_blank" class="footer-link me-4">More Themes</a>

                  <a
                    href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                    target="_blank"
                    class="footer-link me-4"
                    >Documentation</a
                  >

                  <a
                    href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                    target="_blank"
                    class="footer-link me-4"
                    >Support</a
                  >
                </div>
              </div>
            </footer>
            <!-- / Footer -->

            <!-- The Modal -->
            <div class="modal" id="modalDivisi">
                <div class="modal-dialog">
                    <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Tambah divisi</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <input type="hidden" id="idx" value="">
                        <input type="hidden" id="name" value="">
                        <div class="mb-3">
                                <label for="nama-karyawan" class="form-label">Nama</label>
                                <input id="nama-karyawan" class="form-control" value="" type="text" placeholder="Masukkan Nama Karyawan" />
                        </div>
                        <div class="mb-3">
                                <label for="email-karyawan" class="form-label">Email</label>
                                <input id="email-karyawan" class="form-control" value="" type="text" placeholder="Masukkan Email Karyawan" />
                        </div>
                        <div class="mb-3" id="pass-input">
                                <label for="pass-karyawan" class="form-label">Password</label>
                                <input id="pass-karyawan" class="form-control" value="" type="text" placeholder="Masukkan Password Karyawan" />
                        </div>
                        <div class="mb-3" id="repass">
                                <label for="repass-karyawan" class="form-label">Konfirmasi Password</label>
                                <input id="repass-karyawan" class="form-control" value="" type="text" placeholder="Masukkan Konfirmasi Password" />
                        </div>
                        <div class="mb-3">
                                <label for="phone-karyawan" class="form-label">Nomor HP</label>
                                <input id="phone-karyawan" class="form-control" value="" type="text" placeholder="Masukkan Nomor HP Karyawan" />
                        </div>
                        <div class="mb-3">
                                <label for="address-karyawan" class="form-label">Alamat</label>
                                <input id="address-karyawan" class="form-control" value="" type="text" placeholder="Masukkan Alamat Karyawan" />
                        </div>
                        <div class="mb-3">
                            <label for="divSelect" class="form-label">divisi</label>
                            <select id="divSelect" class="form-select">
                            <!-- <option value="1">IT</option>
                            <option value="2">Marketing</option>
                            <option value="3">Financial</option> -->
                            </select>
                        </div>
                        <div class="mb-3" id="status-kar">
                            <label for="statusSelect" class="form-label">Status Karyawan</label>
                            <select id="statusSelect" class="form-select">
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                            </select>
                        </div>
                    </div>

                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary save-action-edit" id="save-data-divisi">Save</button>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Modal Confirm -->
            <div class="modal fade" id="modalConfirm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Confirm action</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <input type="hidden" id="idx" value="">
                      <input type="hidden" id="name" value="">
                      <div id="reason">
                        <label for="exampleFormControlTextarea1" class="form-label">Reason</label>
                        <textarea class="form-control" id="reason-val" rows="3"></textarea>
                      </div>
                      <label class="form-check-label chkbox_wrapper mt-3">
                            <input class="form-check-input filled-in prm_services i-prm-detail" name="" type="checkbox" id="confirm-action" value="1">
                            <span class="form-check-sign">
                                <span class="check"></span>
                                <label for="confirm-action" id="ck-label" style="cursor:pointer;">Checklist jika anda ingin melanjutkan!</label>
                            </span>
                      </label>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary save-action">Save</button>
                    </div>
                  </div>
                </div>
              </div>

              @include('layout.toast')
            <div class="content-backdrop fade"></div>
          </div>
          <!-- Content wrapper -->
          <script src="{{ asset('js/karyawan/karyawan_list.js') }}"></script>
          <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
<!-- </div> -->
@endsection
