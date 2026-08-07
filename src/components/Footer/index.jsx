import {
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  Footer as FooterFlowbite,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

export default function Footer() {
  return (
    <FooterFlowbite
      container
      className="mt-auto mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterBrand
            href="/"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            name="Movie Booking"
          />

          <FooterLinkGroup>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Licensing</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright
          href="#"
          by="ngKhang"
          year={new Date().getFullYear()}
        />
      </div>
    </FooterFlowbite>
  );
}
