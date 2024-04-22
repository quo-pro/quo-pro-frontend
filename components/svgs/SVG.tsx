export type TSVGProps = React.HTMLAttributes<SVGElement>;
export type TSVGType = (props: TSVGProps) => JSX.Element;

export const SVG = {
  spinner: (props: TSVGProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  ),
  chevronLeft: (props: TSVGProps) => (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 24 24'
      height='14px'
      width='14px'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z'></path>
    </svg>
  ),
  home: (props: TSVGProps) => (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 24 24'
      height='200px'
      width='200px'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M21 19.9997C21 20.552 20.5523 20.9997 20 20.9997H4C3.44772 20.9997 3 20.552 3 19.9997V9.48882C3 9.18023 3.14247 8.88893 3.38606 8.69947L11.3861 2.47725C11.7472 2.19639 12.2528 2.19639 12.6139 2.47725L20.6139 8.69947C20.8575 8.88893 21 9.18023 21 9.48882V19.9997ZM19 18.9997V9.97791L12 4.53346L5 9.97791V18.9997H19ZM7 14.9997H17V16.9997H7V14.9997Z'></path>
    </svg>
  ),
  settings: (props: TSVGProps) => (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 512 512'
      height='200px'
      width='200px'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
        d='M262.29 192.31a64 64 0 1 0 57.4 57.4 64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22 155.3 155.3 0 0 1-21.46-12.57 16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22 155.3 155.3 0 0 1 21.46 12.57 16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z'
      ></path>
    </svg>
  ),
  user: (props: TSVGProps) => (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 24 24'
      height='200px'
      width='200px'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M12 14V16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM21.4462 20.032L22.9497 21.5355L21.5355 22.9497L20.032 21.4462C19.4365 21.7981 18.7418 22 18 22C15.7909 22 14 20.2091 14 18C14 15.7909 15.7909 14 18 14C20.2091 14 22 15.7909 22 18C22 18.7418 21.7981 19.4365 21.4462 20.032ZM18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C16.8954 16 16 16.8954 16 18C16 19.1046 16.8954 20 18 20Z'></path>
    </svg>
  ),
  close: (props: TSVGProps) => (
    <svg
      width="15" height="15"
      viewBox="0 0 15 15" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
  ),
  checkMark: (props: TSVGProps) => (
    <svg   {...props} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
  ),
  logo: (props: TSVGProps) => (
    <svg  {...props} width="96" height="70" viewBox="0 0 96 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.20833 70L0.291667 65.9167C7.72917 65.9167 22.6042 61.6875 30.0417 53.375C33.6875 49.4375 35.5833 45.7917 35.5833 42.875C33.5417 45.0625 27.5625 46.9583 21.5833 46.9583C8.89583 46.9583 0 36.75 0 24.2083C0 10.0625 9.77083 0 24.5 0C34.7083 0 43.3125 5.39583 47.25 14.2917C50.8958 5.39583 58.9167 0 70 0C84.5833 0 95.6667 10.5 95.6667 29.1667C95.6667 44.0417 85.3125 58.7708 70.5833 65.1875C63.1458 68.3958 55.8542 70 48.7083 70L45.7917 65.9167C53.2292 65.9167 68.1042 61.6875 75.5417 53.375C79.1875 49.4375 81.0833 45.7917 81.0833 42.875C79.0417 45.0625 73.0625 46.9583 67.0833 46.9583C59.3542 46.9583 53.375 43.75 49.2917 37.3333C46.2292 50.1667 36.0208 61.25 22.6042 66.2083C15.8958 68.6875 9.47917 70 3.20833 70Z" fill="black" />
    </svg>
  ),
  users: (props: TSVGProps) => (
    <svg  {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-round"><path d="M18 21a8 8 0 0 0-16 0" /><circle cx="10" cy="8" r="5" /><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" /></svg>
  ),
  feeds: (props: TSVGProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dock"><path d="M2 8h20" /><rect width="20" height="16" x="2" y="4" rx="2" /><path d="M6 16h12" /></svg>),
  pinLeft: (props: TSVGProps) => (
    <svg {...props} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.05005 13.5C2.05005 13.7485 2.25152 13.95 2.50005 13.95C2.74858 13.95 2.95005 13.7485 2.95005 13.5L2.95005 1.49995C2.95005 1.25142 2.74858 1.04995 2.50005 1.04995C2.25152 1.04995 2.05005 1.25142 2.05005 1.49995L2.05005 13.5ZM8.4317 11.0681C8.60743 11.2439 8.89236 11.2439 9.06809 11.0681C9.24383 10.8924 9.24383 10.6075 9.06809 10.4317L6.58629 7.94993L14.5 7.94993C14.7485 7.94993 14.95 7.74846 14.95 7.49993C14.95 7.2514 14.7485 7.04993 14.5 7.04993L6.58629 7.04993L9.06809 4.56813C9.24383 4.39239 9.24383 4.10746 9.06809 3.93173C8.89236 3.75599 8.60743 3.75599 8.4317 3.93173L5.1817 7.18173C5.00596 7.35746 5.00596 7.64239 5.1817 7.81812L8.4317 11.0681Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
  ),
  notificationDotBell: (props: TSVGProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell-dot"><path d="M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 .7 0 1.3.1 1.9.3" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /><circle cx="18" cy="8" r="3" /></svg>
  )
};
