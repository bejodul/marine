import { NextApiRequest, NextApiResponse } from "next/types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  // const json = {
  //   "name": "bejodul",
  //   "email": "hendra055@gmail.com",
  //   "picture": "https://avatars.githubusercontent.com/u/138574444?v=4",
  //   "sub": "138574444",
  //   "iat": 1688998782,
  //   "exp": 1691590782,
  //   "jti": "f10b4294-433f-4f40-967c-4a4606113cbb",
  //   "menuList": [
  //     {
  //       "title": "Dashboards",
  //       "icon": "mdi:home-outline",
  //       "badgeContent": "new",
  //       "badgeColor": "error",
  //       "children": [
  //         {
  //           "title": "CRM",
  //           "path": "/dashboards/crm"
  //         },
  //         {
  //           "title": "Analytics",
  //           "path": "/dashboards/analytics"
  //         },
  //         {
  //           "title": "eCommerce",
  //           "path": "/dashboards/ecommerce"
  //         }
  //       ]
  //     },
  //     {
  //       "title": "Email",
  //       "icon": "mdi:email-outline",
  //       "path": "/apps/email"
  //     },
  //     {
  //       "title": "Chat",
  //       "icon": "mdi:message-outline",
  //       "path": "/apps/chat"
  //     },
  //     {
  //       "title": "Calendar",
  //       "icon": "mdi:calendar-blank-outline",
  //       "path": "/apps/calendar"
  //     },
  //     {
  //       "title": "Invoice",
  //       "icon": "mdi:file-document-outline",
  //       "children": [
  //         {
  //           "title": "List",
  //           "path": "/apps/invoice/list"
  //         },
  //         {
  //           "title": "Preview",
  //           "path": "/apps/invoice/preview"
  //         },
  //         {
  //           "title": "Edit",
  //           "path": "/apps/invoice/edit"
  //         },
  //         {
  //           "title": "Add",
  //           "path": "/apps/invoice/add"
  //         }
  //       ]
  //     },
  //     {
  //       "title": "User",
  //       "icon": "mdi:account-outline",
  //       "children": [
  //         {
  //           "title": "List",
  //           "path": "/apps/user/list"
  //         },
  //         {
  //           "title": "View",
  //           "children": [
  //             {
  //               "title": "Overview",
  //               "path": "/apps/user/view/overview"
  //             },
  //             {
  //               "title": "Security",
  //               "path": "/apps/user/view/security"
  //             },
  //             {
  //               "title": "Billing & Plans",
  //               "path": "/apps/user/view/billing-plan"
  //             },
  //             {
  //               "title": "Notifications",
  //               "path": "/apps/user/view/notification"
  //             },
  //             {
  //               "title": "Connection",
  //               "path": "/apps/user/view/connection"
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       "title": "Roles & Permissions",
  //       "icon": "mdi:shield-outline",
  //       "children": [
  //         {
  //           "title": "Roles",
  //           "path": "/apps/roles"
  //         },
  //         {
  //           "title": "Permissions",
  //           "path": "/apps/permissions"
  //         }
  //       ]
  //     },
  //     {
  //       "title": "Pages",
  //       "icon": "mdi:file-document-outline",
  //       "children": [
  //         {
  //           "title": "User Profile",
  //           "children": [
  //             {
  //               "title": "Profile",
  //               "path": "/pages/user-profile/profile"
  //             },
  //             {
  //               "title": "Teams",
  //               "path": "/pages/user-profile/teams"
  //             },
  //             {
  //               "title": "Projects",
  //               "path": "/pages/user-profile/projects"
  //             },
  //             {
  //               "title": "Connections",
  //               "path": "/pages/user-profile/connections"
  //             }
  //           ]
  //         },
  //         {
  //           "title": "Account Settings",
  //           "children": [
  //             {
  //               "title": "Account",
  //               "path": "/pages/account-settings/account"
  //             },
  //             {
  //               "title": "Security",
  //               "path": "/pages/account-settings/security"
  //             },
  //             {
  //               "title": "Billing",
  //               "path": "/pages/account-settings/billing"
  //             },
  //             {
  //               "title": "Notifications",
  //               "path": "/pages/account-settings/notifications"
  //             },

  //             {
  //               "title": "Connections",
  //               "path": "/pages/account-settings/connections"
  //             }
  //           ]
  //         },
  //         {
  //           "title": "FAQ",
  //           "path": "/pages/faq"
  //         },
  //         {
  //           "title": "Help Center",
  //           "path": "/pages/help-center"
  //         },
  //         {
  //           "title": "Pricing",
  //           "path": "/pages/pricing"
  //         },
  //         {
  //           "title": "Miscellaneous",
  //           "children": [
  //             {
  //               "openInNewTab": true,
  //               "title": "Coming Soon",
  //               "path": "/pages/misc/coming-soon"
  //             },
  //             {
  //               "openInNewTab": true,
  //               "title": "Under Maintenance",
  //               "path": "/pages/misc/under-maintenance"
  //             },
  //             {
  //               "openInNewTab": true,
  //               "title": "Page Not Found - 404",
  //               "path": "/pages/misc/404-not-found"
  //             },
  //             {
  //               "openInNewTab": true,
  //               "title": "Not Authorized - 401",
  //               "path": "/pages/misc/401-not-authorized"
  //             },
  //             {
  //               "openInNewTab": true,
  //               "title": "Server Error - 500",
  //               "path": "/pages/misc/500-server-error"
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       "title": "Auth Pages",
  //       "icon": "mdi:lock-outline",
  //       "children": [
  //         {
  //           "title": "Login",
  //           "children": [
  //             {
  //               "openInNewTab": true,
  //               "title": "Login v1",
  //               "path": "/pages/auth/login-v1"
  //             },
  //             {
  //               "openInNewTab": true,
  //               "title": "Login v2",
  //               "path": "/pages/auth/login-v2"
  //             },
  //             {
  //               "openInNewTab": true,
  //               "title": "Login With AppBar",
  //               "path": "/pages/auth/login-with-appbar"
  //             }
  //           ]
  //         },
  //         {
  //           "title": "Register",
  //           "children": [
  //             {
  //               "openInNewTab": true,
  //               "title": "Register v1",
  //               "path": "/pages/auth/register-v1"
  //             },
  //             {
  //               "openInNewTab": true,
  //               "title": "Register v2",
  //               "path": "/pages/auth/register-v2"
  //             },
  //             {
  //               "openInNewTab": true,
  //               "title": "Register Multi-Steps",
  //               "path": "/pages/auth/register-multi-steps"
  //             }
  //           ]
  //         },
  //         {
  //           "title": "Verify Email",
  //           "children": [
  //             {
  //               "openInNewTab": true,
  //               "title": "Verify Email v1",
  //               "path": "/pages/auth/verify-email-v1"
  //             },
  //             {
  //               "openInNewTab": true,
  //               "title": "Verify Email v2",
  //               "path": "/pages/auth/verify-email-v2"
  //             }
  //           ]
  //         },
  //         {
  //           "title": "Forgot Password",
  //           "children": [
  //             {
  //               "openInNewTab": true,
  //               "title": "Forgot Password v1",
  //               "path": "/pages/auth/forgot-password-v1"
  //             },
  //             {
  //               "openInNewTab": true,
  //               "title": "Forgot Password v2",
  //               "path": "/pages/auth/forgot-password-v2"
  //             }
  //           ]
  //         },
  //         {
  //           "title": "Reset Password",
  //           "children": [
  //             {
  //               "openInNewTab": true,
  //               "title": "Reset Password v1",
  //               "path": "/pages/auth/reset-password-v1"
  //             },
  //             {
  //               "openInNewTab": true,
  //               "title": "Reset Password v2",
  //               "path": "/pages/auth/reset-password-v2"
  //             }
  //           ]
  //         },
  //         {
  //           "title": "Two Steps",
  //           "children": [
  //             {
  //               "openInNewTab": true,
  //               "title": "Two Steps v1",
  //               "path": "/pages/auth/two-steps-v1"
  //             },
  //             {
  //               "openInNewTab": true,
  //               "title": "Two Steps v2",
  //               "path": "/pages/auth/two-steps-v2"
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       "title": "Wizard Examples",
  //       "icon": "mdi:transit-connection-horizontal",
  //       "children": [
  //         {
  //           "title": "Checkout",
  //           "path": "/pages/wizard-examples/checkout"
  //         },
  //         {
  //           "title": "Property Listing",
  //           "path": "/pages/wizard-examples/property-listing"
  //         },
  //         {
  //           "title": "Create Deal",
  //           "path": "/pages/wizard-examples/create-deal"
  //         }
  //       ]
  //     },
  //     {
  //       "icon": "mdi:vector-arrange-below",
  //       "title": "Dialog Examples",
  //       "path": "/pages/dialog-examples"
  //     },
  //     {
  //       "title": "Typography",
  //       "icon": "mdi:format-letter-case",
  //       "path": "/ui/typography"
  //     },
  //     {
  //       "title": "icon:s",
  //       "path": "/ui/icon:s",
  //       "icon": "mdi:google-circles-extended"
  //     },
  //     {

  //       "title": "Cards",
  //       "icon": "mdi:credit-card-outline",
  //       "children": [
  //         {
  //           "title": "Basic",
  //           "path": "/ui/cards/basic"
  //         },
  //         {
  //           "title": "Advanced",
  //           "path": "/ui/cards/advanced"
  //         },
  //         {
  //           "title": "Statistics",
  //           "path": "/ui/cards/statistics"
  //         },
  //         {
  //           "title": "Widgets",
  //           "path": "/ui/cards/widgets"
  //         },
  //         {
  //           "title": "Gamification",
  //           "path": "/ui/cards/gamification"
  //         },
  //         {
  //           "title": "Actions",
  //           "path": "/ui/cards/actions"
  //         }
  //       ]
  //     },
  //     {
  //       "badgeContent": "19",
  //       "title": "Components",
  //       "icon": "mdi:archive-outline",
  //       "badgeColor": "primary",
  //       "children": [
  //         {
  //           "title": "Accordion",
  //           "path": "/components/accordion"
  //         },
  //         {
  //           "title": "Alerts",
  //           "path": "/components/alerts"
  //         },
  //         {
  //           "title": "Avatars",
  //           "path": "/components/avatars"
  //         },
  //         {
  //           "title": "Badges",
  //           "path": "/components/badges"
  //         },
  //         {
  //           "title": "Buttons",
  //           "path": "/components/buttons"
  //         },
  //         {
  //           "title": "Button Group",
  //           "path": "/components/button-group"
  //         },
  //         {
  //           "title": "Chips",
  //           "path": "/components/chips"
  //         },
  //         {
  //           "title": "Dialogs",
  //           "path": "/components/dialogs"
  //         },
  //         {
  //           "title": "List",
  //           "path": "/components/list"
  //         },
  //         {
  //           "title": "Menu",
  //           "path": "/components/menu"
  //         },
  //         {
  //           "title": "Pagination",
  //           "path": "/components/pagination"
  //         },
  //         {
  //           "title": "Progress",
  //           "path": "/components/progress"
  //         },
  //         {
  //           "title": "Ratings",
  //           "path": "/components/ratings"
  //         },
  //         {
  //           "title": "Snackbar",
  //           "path": "/components/snackbar"
  //         },
  //         {
  //           "title": "Swiper",
  //           "path": "/components/swiper"
  //         },
  //         {
  //           "title": "Tabs",
  //           "path": "/components/tabs"
  //         },
  //         {
  //           "title": "Timeline",
  //           "path": "/components/timeline"
  //         },
  //         {
  //           "title": "Toasts",
  //           "path": "/components/toast"
  //         },
  //         {
  //           "title": "Tree View",
  //           "path": "/components/tree-view"
  //         },
  //         {
  //           "title": "More",
  //           "path": "/components/more"
  //         }
  //       ]
  //     },
  //     {
  //       "title": "Form Elements",
  //       "icon": "mdi:form-select",
  //       "children": [
  //         {
  //           "title": "Text Field",
  //           "path": "/forms/form-elements/text-field"
  //         },
  //         {
  //           "title": "Select",
  //           "path": "/forms/form-elements/select"
  //         },
  //         {
  //           "title": "Checkbox",
  //           "path": "/forms/form-elements/checkbox"
  //         },
  //         {
  //           "title": "Radio",
  //           "path": "/forms/form-elements/radio"
  //         },
  //         {
  //           "title": "Custom Inputs",
  //           "path": "/forms/form-elements/custom-inputs"
  //         },
  //         {
  //           "title": "Textarea",
  //           "path": "/forms/form-elements/textarea"
  //         },
  //         {
  //           "title": "Autocomplete",
  //           "path": "/forms/form-elements/autocomplete"
  //         },
  //         {
  //           "title": "Date Pickers",
  //           "path": "/forms/form-elements/pickers"
  //         },
  //         {
  //           "title": "Switch",
  //           "path": "/forms/form-elements/switch"
  //         },
  //         {
  //           "title": "File Uploader",
  //           "path": "/forms/form-elements/file-uploader"
  //         },
  //         {
  //           "title": "Editor",
  //           "path": "/forms/form-elements/editor"
  //         },
  //         {
  //           "title": "Slider",
  //           "path": "/forms/form-elements/slider"
  //         },
  //         {
  //           "title": "Input Mask",
  //           "path": "/forms/form-elements/input-mask"
  //         }
  //       ]
  //     },
  //     {
  //       "icon": "mdi:cube-outline",
  //       "title": "Form Layouts",
  //       "path": "/forms/form-layouts"
  //     },
  //     {
  //       "title": "Form Validation",
  //       "path": "/forms/form-validation",
  //       "icon": "mdi:checkbox-marked-circle-outline"
  //     },
  //     {
  //       "title": "Form Wizard",
  //       "path": "/forms/form-wizard",
  //       "icon": "mdi:transit-connection-horizontal"
  //     },
  //     {
  //       "title": "Table",
  //       "icon": "mdi:grid-large",
  //       "path": "/tables/mui"
  //     },
  //     {
  //       "title": "Mui DataGrid",
  //       "icon": "mdi:grid",
  //       "path": "/tables/data-grid"
  //     },
  //     {
  //       "title": "Charts",
  //       "icon": "mdi:chart-donut",
  //       "children": [
  //         {
  //           "title": "Apex",
  //           "path": "/charts/apex-charts"
  //         },
  //         {
  //           "title": "Recharts",
  //           "path": "/charts/recharts"
  //         },
  //         {
  //           "title": "ChartJS",
  //           "path": "/charts/chartjs"
  //         }
  //       ]
  //     },
  //     {
  //       "path": "/acl",
  //       "action": "read",
  //       "subject": "acl-page",
  //       "icon": "mdi:shield-outline",
  //       "title": "Access Control"
  //     },
  //     {
  //       "title": "Others",
  //       "icon": "mdi:dots-horizontal",
  //       "children": [
  //         {
  //           "title": "Menu Levels",
  //           "children": [
  //             {
  //               "title": "Menu Level 2.1"
  //             },
  //             {
  //               "title": "Menu Level 2.2",
  //               "children": [
  //                 {
  //                   "title": "Menu Level 3.1"
  //                 },
  //                 {
  //                   "title": "Menu Level 3.2"
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           "title": "disabled Menu",
  //           "disabled": true
  //         },
  //         {
  //           "title": "Raise Support",
  //           "externalLink": true,
  //           "openInNewTab": true,
  //           "path": "https://themeselection.com/support"
  //         },
  //         {
  //           "title": "Documentation",
  //           "externalLink": true,
  //           "openInNewTab": true,
  //           "path": "https://demos.themeselection.com/materio-mui-react-nextjs-admin-template/documentation"
  //         }
  //       ]
  //     }
  //   ]
  // }

  const json = {
    "name": "bejodul",
    "email": "hendra055@gmail.com",
    "picture": "https://avatars.githubusercontent.com/u/138574444?v=4",
    "sub": "138574444",
    "iat": 1688998782,
    "exp": 1691590782,
    "jti": "f10b4294-433f-4f40-967c-4a4606113cbb",
    "menuList": [
      {
        "title": "PPKB Online",
        "path": null,
        "children": [
          {
            "title": "PKK",
            "path": "/apps/pkk/list"
          },
          {
            "title": "PPKB",
            "path": null
          },
          {
            "title": "Pranota & Nota",
            "path": null
          },
          {
            "title": "BC 23 Self Clearence",
            "path": null
          },
          {
            "title": "NPE Self Clearence",
            "path": null
          },
          {
            "title": "SPJM Import Self Clearence",
            "path": null
          },
          {
            "title": "SPJM Export Self Clearence",
            "path": null
          },
          {
            "title": "SPPB Self Clearence",
            "path": null
          },
          {
            "title": "Manual Self Clearence",
            "path": null
          },
          {
            "title": "SSM Self Clearence",
            "path": null
          },
          {
            "title": "DO",
            "path": null
          },
          {
            "title": "COPARN",
            "path": null
          }
        ]
      },
      {
        "title": "RPKOP Online",
        "path": null,
        "children": [
          {
            "title": "Manifest",
            "path": null
          },
          {
            "title": "RPKOP",
            "path": null
          },
          {
            "title": "Validasi RPKOP",
            "path": "/apps/rpkop/validate"
          },
          {
            "title": "Uper Barang",
            "path": "/apps/rpkop/uper"
          },
          {
            "title": "Ijin OP Lanjutan",
            "path": null
          },
          {
            "title": "Batal Validasi RPKOP",
            "path": "/apps/rpkop/cancel_op"
          }
        ]
      },
      {
        "title": "DEPO Online",
        "path": null,
        "children": [
          {
            "title": "Receiving",
            "path": null
          },
          {
            "title": "Delivery",
            "path": null
          }
        ]
      },
      {
        "title": "Approval Uper",
        "path": null,
        "children": [
          {
            "title": "Kapal",
            "path": null
          },
          {
            "title": "Barang",
            "path": null
          }
        ]
      },
      {
        "title": "Pelayanan Kapal",
        "path": null,
        "children": [
          {
            "title": "Penetapan PPKB",
            "path": null
          },
          {
            "title": "SPK Air",
            "path": null
          },
          {
            "title": "Realisasi Air",
            "path": null
          },
          {
            "title": "Validasi Realisasi Air",
            "path": null
          },
          {
            "title": "Uncomplete Realisasi Air",
            "path": null
          },
          {
            "title": "Graphic Schedule",
            "path": null
          },
          {
            "title": "Expedisi Pranota Kapal",
            "path": null
          },
          {
            "title": "Expedisi Pranota Air",
            "path": null
          },
          {
            "title": "Ijin PKK Manual",
            "path": null
          }
        ]
      },
      {
        "title": "Kepanduan",
        "path": null,
        "children": [
          {
            "title": "Menara",
            "path": null
          },
          {
            "title": "SPK",
            "path": null
          },
          {
            "title": "2A1 - 2A2",
            "path": null
          },
          {
            "title": "DTJK",
            "path": null
          },
          {
            "title": "Uncomplete DTJK",
            "path": null
          },
          {
            "title": "Realisasi Labuh",
            "path": null
          },
          {
            "title": "Realisasi Motor Pandu",
            "path": null
          },
          {
            "title": "Menara Radio",
            "path": null
          },
          {
            "title": "Menara Radio Teleponi",
            "path": null
          }
        ]
      },
      {
        "title": "Approval Pranota Kapal",
        "path": "approval_pranota",
        "children": []
      },
      {
        "title": "Pranota Kapal (Expedisi)",
        "path": "approval_pranota",
        "children": []
      },
      {
        "title": "User Management",
        "path": null,
        "children": [
          {
            "title": "User Class",
            "path": null
          },
          {
            "title": "User Registration",
            "path": null
          },
          {
            "title": "Change Password",
            "path": null
          },
          {
            "title": "User List",
            "path": null
          }
        ]
      },
      {
        "title": "Monitoring",
        "path": null,
        "children": [
          {
            "title": "Kapal",
            "path": null
          },
          {
            "title": "Barang",
            "path": null
          },
          {
            "title": "Situasi Tambatan",
            "path": null
          },
          {
            "title": "User",
            "path": null
          },
          {
            "title": "Inaportnet",
            "path": null
          },
          {
            "title": "H2H",
            "path": null
          },
          {
            "title": "Karantina",
            "path": null
          },
          {
            "title": "KPI",
            "path": null
          },
          {
            "title": "IBS RESEND",
            "path": null
          },
          {
            "title": "IBS",
            "path": null
          },
          {
            "title": "IBS - Expedisi",
            "path": null
          },
          {
            "title": "Kapal per Agen",
            "path": null
          }
        ]
      },
      {
        "title": "Master",
        "path": null,
        "children": [
          {
            "title": "Vessel",
            "path": null
          },
          {
            "title": "Vessel Maintenance",
            "path": null
          },
          {
            "title": "Master Tarif Air",
            "path": null
          },
          {
            "title": "Master Tarif Labuh",
            "path": null
          },
          {
            "title": "Master Tarif Pandu",
            "path": null
          },
          {
            "title": "Master Tarif Tambat",
            "path": null
          },
          {
            "title": "Master Tarif Tunda",
            "path": null
          },
          {
            "title": "Master Kade",
            "path": "/apps/master_kade"
          },
          {
            "title": "Master Pandu",
            "path": "/apps/masterpandu"
          },
          {
            "title": "Master Motor Pandu",
            "path": "/apps/master/fasilitas"
          },
          {
            "title": "Master Kapal Tunda",
            "path": "/apps/master/fasilitas"
          },
          {
            "title": "Master Rekening",
            "path": null
          },
          {
            "title": "Master Port",
            "path": null
          },
          {
            "title": "Master Kurs",
            "path": "/apps/kurs"
          },
          {
            "title": "Master Vessel Type",
            "path": null
          },
          {
            "title": "Master Customer",
            "path": null
          },
          {
            "title": "Persentase Uper",
            "path": null
          }
        ]
      },
      {
        "title": "Maintenance",
        "path": null,
        "children": [
          {
            "title": "PKK",
            "path": null
          },
          {
            "title": "Penetapan",
            "path": null
          },
          {
            "title": "Inaportnet - PPK",
            "path": null
          }
        ]
      },
      {
        "title": "Report",
        "path": null,
        "children": [
          {
            "title": "Produksi Air",
            "path": null
          },
          {
            "title": "Produksi Pandu Tunda",
            "path": null
          },
          {
            "title": "Produksi Tambat",
            "path": null
          },
          {
            "title": "Kapal Wajib Pandu",
            "path": null
          },
          {
            "title": "Kapal Siap Pranota",
            "path": null
          },
          {
            "title": "Kapal Rencana Tiba",
            "path": null
          },
          {
            "title": "SIMOPEL & TPP",
            "path": null
          },
          {
            "title": "Produksi Barang",
            "path": null
          },
          {
            "title": "Kinerja",
            "path": null
          },
          {
            "title": "Utilisasi",
            "path": null
          },
          {
            "title": "Run Report",
            "path": null
          },
          {
            "title": "Dashboard Jasa Maritim",
            "path": null
          }
        ]
      }
    ]
  }

  return res.status(200).end(JSON.stringify(json))
}
