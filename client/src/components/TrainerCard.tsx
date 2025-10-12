import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";
import {Mail, Linkedin, Globe} from "lucide-react";

interface TrainerCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  expertise?: string[];
  email?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
}

export const TrainerCard = ({
                              name,
                              role,
                              bio,
                              imageUrl,
                              expertise = [],
                              email,
                              linkedinUrl,
                              websiteUrl,
                            }: TrainerCardProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card
      className="overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:shadow-[var(--shadow-medium)]">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Avatar Section */}
          <div className="flex-shrink-0 flex justify-center sm:justify-start">
            <Avatar className="h-32 w-32 sm:h-44 sm:w-44 ring-2 ring-white/10">
              <AvatarImage src={imageUrl} alt={name}/>
              <AvatarFallback
                className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xl sm:text-2xl font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-3 sm:space-y-4 text-center sm:text-left">
            {/* Name and Role */}
            <div>
              <h3 className="text-xl sm:text-3xl font-bold text-gray-100">{name}</h3>
              <p className="text-xs sm:text-base font-medium text-gray-200 mt-1">{role}</p>
            </div>

            {/* Bio */}
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">{bio}</p>

            {/* Expertise Tags */}
            {expertise.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
                {expertise.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-[10px] sm:text-xs font-medium bg-secondary/80 hover:bg-secondary transition-colors px-2 py-0.5"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            )}

            {/* Contact Links */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 justify-center sm:justify-start">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                  title="Send email"
                >
                  <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4"/>
                  <span>Email</span>
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                  title="LinkedIn profile"
                >
                  <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4"/>
                  <span>LinkedIn</span>
                </a>
              )}
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                  title="Personal website"
                >
                  <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4"/>
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
