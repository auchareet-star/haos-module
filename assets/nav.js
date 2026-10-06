/* ==========================================================================
   HA.OS — คู่มือการใช้งานรายโมดูล
   Shared sidebar navigation. Renders into <aside class="sidebar" id="nav">.
   Works from file:// (no fetch, pure DOM).
   ========================================================================== */

(function () {
  var GROUPS = [
    {
      title: 'ระบบหลัก',
      items: [
        { n: '1', href: '01-blood-bank.html',    label: 'งานธนาคารเลือด' },
        { n: '2', href: '02-finance.html',       label: 'การเงินผู้ป่วยนอก / ใน' },
        { n: '3', href: '03-reimbursement.html', label: 'บัญชีลูกหนี้ / งานเรียกเก็บ' },
        { n: '4', href: '04-social-welfare.html',label: 'งานสังคมสงเคราะห์' },
        { n: '5', href: '05-admin.html',         label: 'งานผู้ดูแลระบบ' },
        { n: '5', href: '05-admin-flow.html',    label: 'ผู้ดูแลระบบ · Flow รายเมนู' }
      ]
    },
    {
      title: 'Smart IPD (ผู้ป่วยใน)',
      items: [
        { n: '6', href: '06-smartipd-doctor.html',     label: 'สำหรับแพทย์' },
        { n: '7', href: '07-smartipd-nurse.html',      label: 'สำหรับพยาบาล' },
        { n: '8', href: '08-smartipd-pharmacist.html', label: 'สำหรับเภสัชกร' }
      ]
    },
    {
      title: 'ตรวจสุขภาพ',
      items: [
        { n: '9', href: '09-health-checkup.html', label: 'ห้องตรวจสุขภาพ' }
      ]
    },
    {
      title: 'การเริ่มใช้ระบบ',
      items: [
        { n: '10', href: '10-data-migration.html', label: 'ย้ายข้อมูลจากระบบเดิม' }
      ]
    }
  ];

  function currentFile() {
    var p = location.pathname.split('/').pop();
    return (!p || p === '') ? 'index.html' : p;
  }

  function build() {
    var host = document.getElementById('nav');
    if (!host) return;

    var here = currentFile();
    var html = '';

    html += '<a class="sidebar__brand" href="index.html">' +
            '<b>HA.OS · คู่มือการใช้งาน</b>' +
            '<span>อธิบายการทำงานรายโมดูล</span>' +
            '</a>';

    html += '<div class="nav-group"><ul><li>' +
            '<a href="index.html"' + (here === 'index.html' ? ' class="is-active"' : '') + '>' +
            '<i>—</i><span>หน้าแรก</span></a></li></ul></div>';

    GROUPS.forEach(function (g) {
      html += '<div class="nav-group"><p class="nav-group__title">' + g.title + '</p><ul>';
      g.items.forEach(function (it) {
        // เปิดหน้าฉบับเทคนิคอยู่ ก็ยังให้ไฮไลต์โมดูลเดิม
        var techHref = it.href.replace('.html', '-tech.html');
        var active = (here === it.href || here === techHref) ? ' class="is-active"' : '';
        html += '<li><a href="' + it.href + '"' + active + '>' +
                '<i class="m' + it.n + '">' + it.n + '</i>' +
                '<span>' + it.label + '</span></a></li>';
      });
      html += '</ul></div>';
    });

    host.innerHTML = html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
