import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';
import ArticleCard from '@/components/ArticleCard';
import YouTubeVideoCard from '@/components/YouTubeVideoCard';
import ContentSidebar from '@/components/ContentSidebar';

interface Article {
  _id: string;
  title: string;
  author: string;
  slug: string;
  views: number;
  createdAt: string;
}

interface Announcement {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
}

interface YouTubeVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, announcementsRes, videosRes] = await Promise.all([
          axios.get('/api/articles?limit=6'),
          axios.get('/api/announcements'),
          axios.get('/api/youtube/videos?limit=6'),
        ]);

        if (articlesRes.data.success) {
          setArticles(articlesRes.data.data.slice(0, 6));
        }
        if (announcementsRes.data.success) {
          setAnnouncements(announcementsRes.data.data);
        }
        if (videosRes.data.success) {
          setVideos(videosRes.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show support modal on first visit to home page
  useEffect(() => {
    try {
      const key = 'malahidaSupportShown';
      if (localStorage.getItem(key) !== 'yes') {
        setShowSupportModal(true);
      }
    } catch {}
  }, []);

  const closeSupportModal = () => {
    try { localStorage.setItem('malahidaSupportShown', 'yes'); } catch {}
    setShowSupportModal(false);
  };

  return (
    <Layout
      title="Home"
      description="Wisdom Circle – Malahida: A community dedicated to philosophy, freethought, atheism, rationalism, and Amazigh intellectual culture."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* First-visit Support Modal */}
        {showSupportModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={closeSupportModal} />
            <div className="relative max-w-lg w-[92%] md:w-[680px] rounded-2xl p-6 md:p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl" dir="rtl" role="dialog" aria-modal="true" aria-labelledby="support-title">
              <button
                onClick={closeSupportModal}
                className="absolute top-3 left-3 rounded-md p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="إغلاق"
              >
                ✖
              </button>
              <h2 id="support-title" className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white text-right">💡 ادعم مشروع Malahida</h2>
              <div className="mt-3 space-y-2 text-gray-800 dark:text-gray-200 leading-relaxed text-right">
                <p>هذا الفضاء قائم بفضل مجتمعٍ يؤمن بأنّ الفكر الحرّ مسؤولية جماعية.</p>
                <p>إن كنت ترى في Malahida قيمة، يمكنك المساهمة في دعم الكوميونيتي:</p>
                <p>🕯️ إمّا ماديًا لمساعدة الموقع على الاستمرار،</p>
                <p>أو ببساطة عبر نشر المحتوى ومشاركة الفكرة مع من يبحث عن المعنى.</p>
                <p>كل دعم، مهما كان صغيرًا، يصنع فرقًا كبيرًا.</p>
              </div>
              <div className="mt-5 flex justify-end">
                <button onClick={closeSupportModal} className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow hover:shadow-lg transition">حسناً</button>
              </div>
            </div>
          </div>
        )}
        {/* Drawer trigger */}
        <div className="mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <img
              src="https://i.postimg.cc/hGHqdJ5f/flish-katdir.gif"
              alt="Category Content"
              className="w-5 h-5 rounded-sm"
              draggable="false"
            />
            <span>Category Content</span>
          </button>
        </div>

        {/* Off-canvas sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}
        <aside
          className={`fixed top-0 left-0 h-full w-72 z-[70] transform transition-transform duration-300 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          aria-hidden={!sidebarOpen}
        >
          <div className="h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-white">Content</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close sidebar"
              >
                ✖
              </button>
            </div>
            <div className="p-3 h-[calc(100%-52px)] overflow-y-auto">
              <ContentSidebar mode="drawer" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="min-w-0">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
            Wisdom Circle – Malahida
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A community dedicated to philosophy, freethought, atheism, rationalism, and Amazigh intellectual culture.
          </p>
        </div>

        {/* Wisdom Talks Access Section */}
        <section className="mt-2 mb-10">
          <div className="rounded-2xl p-6 md:p-8 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">🗣️ Wisdom Talks</h2>
                <p className="mt-2 text-sm md:text-base text-gray-700 dark:text-gray-300" dir="rtl">
                  اشكي بما تشعر، وعبّر عما يؤلمك... أبولو، رفقة خبير، سيصغي لك ويجيبك بما تستحق من حكمة.
                </p>
              </div>
              <div className="flex items-center">
                <a
                  href="/talks?openModal=1"
                  className="inline-flex items-center px-5 py-3 rounded-2xl text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                >
                  ابدأ الآن
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Announcements */}
        {announcements.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="mr-3">📢</span>
              Announcements
            </h2>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement._id}
                  className="bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-900/30 dark:to-primary-800/20 border-l-4 border-primary-500 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{announcement.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Latest Articles */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <span className="mr-3">📝</span>
              Latest Articles
            </h2>
            <a
              href="/articles"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors duration-200 flex items-center space-x-1"
            >
              <span>View All</span>
              <span>→</span>
            </a>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Loading articles...</p>
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No articles yet. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Latest YouTube Videos */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <span className="mr-3">🎥</span>
              Latest Videos
            </h2>
            <a
              href="/hedra"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors duration-200 flex items-center space-x-1"
            >
              <span>View All</span>
              <span>→</span>
            </a>
          </div>
          {loading ? (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
              <p className="text-gray-600 dark:text-gray-400 text-lg">Loading videos...</p>
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {videos.map((video) => (
                <YouTubeVideoCard key={video.videoId} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No videos available. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Wisdom Team (Compact Grid) */}
        <section className="mt-12">
          <div className="rounded-2xl p-4 md:p-6 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">🛡️</span>
              Wisdom Team
            </h2>

            {/* Compact grid layout */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 place-items-center">
              {/* Apollo Mazigh */}
              <a href="/contact" className="group flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-2 ring-primary-500/30 shadow-sm group-hover:scale-105 transition-transform">
                  <img
                    src="https://i.postimg.cc/y8njwFTS/image.png"
                    alt="Apollo Mazigh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-1 text-sm md:text-base font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  Apollo Mazigh
                </span>
              </a>

              {/* dada */}
              <a href="/contact" className="group flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-2 ring-primary-500/30 shadow-sm group-hover:scale-105 transition-transform">
                  <img
                    src="https://i.postimg.cc/W30kPVPQ/image.png"
                    alt="dada"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-1 text-sm md:text-base font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  dada
                </span>
              </a>
            </div>

            {/* Team description (Arabic) */}
            <div
              className="mt-6 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto space-y-2"
              dir="rtl"
            >
              <p>فريق وِسدوم يضمّ نخبة من الأصدقاء الذين يجمعهم شغف واحد: إيصال صوت الغالبية الصامتة.</p>
              <p>يعملون معًا في انسجام، يكمّلون بعضهم بعضًا، ويؤمنون أن الفكرة حين تُشارك، تُصبح أقوى.</p>
              <p>وبينهم أصدقاء في الظل، لا يسعون إلى الظهور، لكن بصمتهم حاضرة في كل إنجاز.</p>
              <p>إليهم، من القلب، شكرٌ خالصٌ من هنا وهناك.</p>
            </div>
          </div>
        </section>
          </div>
      </div>
    </Layout>
  );
}

