import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { SubredditPage } from "../pages/SubredditPage";
import { PostDetailPage } from "../pages/PostDetailPage";
import { ProfilePage } from "../pages/ProfilePage";
import { CreatePostPage } from "../pages/CreatePostPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/r/:subreddit" element={<SubredditPage />} />
      <Route path="/r/:subreddit/comments/:postId" element={<PostDetailPage />} />
      <Route path="/user/:username" element={<ProfilePage />} />
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route 
        path="/submit" 
        element={
          <ProtectedRoute>
            <CreatePostPage />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};