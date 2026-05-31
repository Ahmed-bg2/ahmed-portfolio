export type SocialStyle = {
  iconClassName: string;
  primaryIconClassName: string;
  contactCardClassName: string;
  contactIconWrapClassName: string;
  contactArrowClassName: string;
};

const fallbackStyle: SocialStyle = {
  iconClassName: "text-slate-100 group-hover:text-sky-100",
  primaryIconClassName: "text-slate-950 group-hover:text-slate-900",
  contactCardClassName:
    "border-white/[0.08] bg-white/[0.035] hover:border-violet-200/30 hover:bg-violet-200/[0.055] hover:shadow-[0_0_34px_rgba(168,85,247,0.12)]",
  contactIconWrapClassName:
    "border-violet-200/[0.16] bg-violet-200/[0.08] text-violet-100 group-hover:border-violet-100/30 group-hover:bg-violet-200/[0.12]",
  contactArrowClassName: "text-white/38 group-hover:text-violet-100"
};

const socialStyles: Record<string, SocialStyle> = {
  GitHub: {
    iconClassName: "text-white/92 group-hover:text-white",
    primaryIconClassName: "text-slate-950 group-hover:text-white",
    contactCardClassName:
      "border-white/[0.08] bg-white/[0.035] hover:border-white/28 hover:bg-white/[0.065] hover:shadow-[0_0_34px_rgba(255,255,255,0.1)]",
    contactIconWrapClassName:
      "border-white/[0.16] bg-white/[0.07] text-white/90 group-hover:border-white/32 group-hover:bg-white/[0.11] group-hover:text-white",
    contactArrowClassName: "text-white/38 group-hover:text-white/82"
  },
  LinkedIn: {
    iconClassName: "text-[#0a66c2] group-hover:text-[#2ea3ff]",
    primaryIconClassName: "text-[#0a66c2] group-hover:text-[#004182]",
    contactCardClassName:
      "border-[#0a66c2]/18 bg-[#0a66c2]/[0.055] hover:border-[#2ea3ff]/38 hover:bg-[#0a66c2]/[0.095] hover:shadow-[0_0_36px_rgba(10,102,194,0.2)]",
    contactIconWrapClassName:
      "border-[#2ea3ff]/24 bg-[#0a66c2]/14 text-[#74b8ff] group-hover:border-[#2ea3ff]/45 group-hover:bg-[#0a66c2]/22 group-hover:text-[#a8d4ff]",
    contactArrowClassName: "text-white/38 group-hover:text-[#74b8ff]"
  }
};

export function getSocialStyle(label: string) {
  return socialStyles[label] ?? fallbackStyle;
}
