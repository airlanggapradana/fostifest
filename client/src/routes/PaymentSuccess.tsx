import {
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router";
import {FaWhatsapp} from "react-icons/fa";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className={"flex flex-col items-center justify-center h-screen"}>
      {/* Success Header */}
      <div className="text-center mb-8 animate-fadeInUp">
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 mx-auto relative">
            {/* Animated Background Circle */}
            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-scaleIn"></div>

            {/* Animated Checkmark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-emerald-600 animate-checkmarkDraw"/>
            </div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4 animate-fadeInUp animation-delay-200">
          Payment Successful!
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto animate-fadeInUp animation-delay-300">
          Terimakasih telah melakukan pembayaran. Silakan lanjut join ke grub di bawah sesuai dengan cabang lomba yg
          kamu ikuti.
        </p>

        <div className="mt-6 space-y-4 animate-fadeInUp animation-delay-400">
          <div className={'flex items-center justify-center gap-5'}>
            <Button
              variant={'secondary'}
              onClick={() => window.open('https://chat.whatsapp.com/EnwwlJp7ayQ345PBZL9LqM?mode=ems_copy_t', '_blank')}
            >
              <FaWhatsapp/>
              Software Development
            </Button>
            <Button
              variant={'secondary'}
              onClick={() => window.open('https://chat.whatsapp.com/JWNHx2BcWQsLTkcT6uc1K7?mode=ems_copy_t', '_blank')}
            >
              <FaWhatsapp/>
              UI/UX Design
            </Button>
            <Button
              variant={'secondary'}
              onClick={() => window.open('https://chat.whatsapp.com/Fr3LIVESzUs7I8D9Inx3UG?mode=ems_copy_t', '_blank')}
            >
              <FaWhatsapp/>
              Sumo Bot
            </Button>
            <Button
              variant={'secondary'}
              onClick={() => window.open('https://chat.whatsapp.com/FwyUSBa3z676mlenmN8onW?mode=ems_copy_t', '_blank')}
            >
              <FaWhatsapp/>
              Line Follower
            </Button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-2 flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-800">
        <Button
          size="lg"
          className="bg-teal-600 hover:bg-teal-700 hover:scale-[1.05] transition-all duration-200 shadow-lg hover:shadow-xl"
          onClick={() => navigate('/', {replace: true})}
        >
          Go to Dashboard
          <ArrowRight className="w-4 h-4 ml-2"/>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="hover:bg-slate-50 hover:scale-[1.05] transition-all duration-200"
          onClick={() => navigate('/profile', {replace: true})}
        >
          Continue
        </Button>
      </div>

      {/* Support Note */}
      <div className="mt-12 text-center animate-fadeInUp animation-delay-900">
        <p className="text-sm text-gray-300">
          Need help? Contact our support team by sending messages to{' '}
          <a href="https://wa.me/81227151326" className="text-blue-300 hover:text-blue-400 underline transition-colors">
            Rangga
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
