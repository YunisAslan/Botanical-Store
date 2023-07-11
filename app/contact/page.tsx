import Image from "next/image";
import Signature from "@/public/assets/images/signature.png";

function Contact() {
  return (
    <div>
      <h1>
        We ship healthy potted plants right to your doorstep. Each plant comes
        with simple care instructions from our plant experts.
      </h1>

      <p>Sarah Jefferson - CEO</p>

      <Image alt="Signature" src={Signature} width={145} height={60} />
    </div>
  );
}

export default Contact;
