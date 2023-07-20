"use client";
import React, { useEffect } from "react";
import HeartOutline from "@/components/icons/heart-outline";
import HeartSolid from "@/components/icons/heart-solid";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setPostLike } from "@/actions/set-post-like";

interface LikeButtonProps {
  slug?: string;
  likes?: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ slug = "", likes = 0 }) => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  const [liking, setLiking] = React.useState(false);
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={liking}
      onClick={async () => {
        setLiking(true);
        const response = await setPostLike(slug);
        if (response) {
          setLiking(false);
          toast.success("Баярлалаа");
          router.refresh();
        } else {
          setLiking(false);
          toast.error("Та өмнө нь зүрх дарсан байна.");
        }
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative inline-flex items-center mx-auto py-2 justify-center rounded-md border border-black/5 w-full bg-white hover:bg-gray-50 hover:shadow-sm"
    >
      {isHovering ? (
        <HeartSolid className="-ml-0.5 h-5 w-5 text-red-600" />
      ) : (
        <HeartOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
      )}
      <span className="absolute -top-[10px] -right-[5px] font-semibold text-xs text-gray-500 bg-white rounded-full ring-1 ring-black/5 shadow-sm px-[4px]">
        {likes}
      </span>
      <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-900">
        Like
      </span>
    </button>
  );
};

export default LikeButton;
