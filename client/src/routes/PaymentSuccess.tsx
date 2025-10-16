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
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
      {/* Success Header */}
      <div className="text-center mb-6 sm:mb-8 animate-fadeInUp max-w-full">
        <div className="relative inline-block mb-4 sm:mb-6">
          <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto relative">
            {/* Animated Background Circle */}
            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-scaleIn"></div>

            {/* Animated Checkmark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-600 animate-checkmarkDraw"/>
            </div>
          </div>
        </div>

        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 mb-3 sm:mb-4 animate-fadeInUp animation-delay-200">
          Payment Successful!
        </h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto animate-fadeInUp animation-delay-300 px-2">
          Terimakasih telah melakukan pembayaran. Silakan lanjut join ke grub di bawah sesuai dengan cabang lomba yg
          kamu ikuti dan harap untuk konfirmasi ke contact person berikut <span
          className="block sm:inline mt-2 sm:mt-0">
                        <a href="https://wa.me/082137748602"
                           className="text-blue-300 hover:text-blue-400 underline transition-colors mr-2">
                          Najla
                        </a>
                        <a href="https://wa.me/085713041829"
                           className="text-blue-300 hover:text-blue-400 underline transition-colors">
                          Paramesti
                        </a>
                      </span>
        </p>

        <div className="mt-5 sm:mt-6 space-y-3 animate-fadeInUp animation-delay-400">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap md:items-center md:justify-center gap-3 sm:gap-4">
            <Button
              variant="secondary"
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm sm:text-base"
              onClick={() => window.open('https://chat.whatsapp.com/EnwwlJp7ayQ345PBZL9LqM?mode=ems_copy_t', '_blank')}
            >
              <FaWhatsapp className="shrink-0"/>
              <span className="truncate">Software Development</span>
            </Button>
            <Button
              variant="secondary"
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm sm:text-base"
              onClick={() => window.open('https://chat.whatsapp.com/JWNHx2BcWQsLTkcT6uc1K7?mode=ems_copy_t', '_blank')}
            >
              <FaWhatsapp className="shrink-0"/>
              <span className="truncate">UI/UX Design</span>
            </Button>
            <Button
              variant="secondary"
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm sm:text-base"
              onClick={() => window.open('https://chat.whatsapp.com/Fr3LIVESzUs7I8D9Inx3UG?mode=ems_copy_t', '_blank')}
            >
              <FaWhatsapp className="shrink-0"/>
              <span className="truncate">Sumo Bot</span>
            </Button>
            <Button
              variant="secondary"
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm sm:text-base"
              onClick={() => window.open('https://chat.whatsapp.com/FwyUSBa3z676mlenmN8onW?mode=ems_copy_t', '_blank')}
            >
              <FaWhatsapp className="shrink-0"/>
              <span className="truncate">Line Follower</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 justify-center animate-fadeInUp animation-delay-800 w-full max-w-md">
        <Button
          size="lg"
          className="bg-teal-600 hover:bg-teal-700 hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
          onClick={() => navigate('/', {replace: true})}
        >
          Go to Home
          <ArrowRight className="w-4 h-4 ml-2 hidden sm:inline"/>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="hover:bg-slate-50 hover:scale-[1.02] transition-all duration-200 w-full sm:w-auto"
          onClick={() => navigate('/profile', {replace: true})}
        >
          Continue
        </Button>
      </div>

      {/* Support Note */}
      <div className="mt-8 sm:mt-12 text-center animate-fadeInUp animation-delay-900 px-4">
        <p className="text-xs sm:text-sm text-gray-300">
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