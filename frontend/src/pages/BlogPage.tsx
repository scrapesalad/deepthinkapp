import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, CardActionArea, Breadcrumbs, Link, Divider, Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { blogPosts as blogPostsObj } from '../data/blogPosts';
import { useState, useRef, useEffect } from 'react';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Helmet } from 'react-helmet-async';
import useMediaQuery from '@mui/material/useMediaQuery';

const blogPosts = Object.values(blogPostsObj);

const BlogCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  border: `1.5px solid transparent`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 8px 24px ${theme.palette.primary.main}22`,
    borderColor: theme.palette.primary.main,
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
}));

const SidebarBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    position: 'sticky',
    top: theme.spacing(10),
  },
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  boxShadow: `0 2px 8px ${theme.palette.primary.main}11`,
  marginBottom: theme.spacing(4),
  border: `1.5px solid ${theme.palette.primary.light}`,
}));

const BlogPage = () => {
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const [visibleCount, setVisibleCount] = useState(6);
  const visiblePosts = sortedPosts.slice(0, visibleCount);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const recentPosts = sortedPosts.slice(0, 5);
  const mostViewedPosts = blogPosts.slice(0, 3);

  useEffect(() => {
    if (sortedPosts.length <= 6) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < sortedPosts.length) {
          setVisibleCount((c) => Math.min(c + 6, sortedPosts.length));
        }
      },
      { threshold: 1 }
    );
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [visibleCount, sortedPosts.length]);

  const theme = useTheme();

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #ff6600 0%, #fff 100%)', minHeight: '100vh', pb: 8 }}>
      <Helmet>
        <title>DeepThink AI Blog | Free AI Tools, Guides & Insights</title>
        <meta name="description" content="Explore the DeepThink AI Blog for the latest on free AI tools, content creation, image generation, SEO, monetization, and more. Discover how to supercharge your workflow with DeepThink AI." />
        <link rel="canonical" href="https://www.deepthinkai.app/blog" />
        <meta property="og:title" content="DeepThink AI Blog | Free AI Tools, Guides & Insights" />
        <meta property="og:description" content="Explore the DeepThink AI Blog for the latest on free AI tools, content creation, image generation, SEO, monetization, and more. Discover how to supercharge your workflow with DeepThink AI." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.deepthinkai.app/blog" />
        <meta property="og:image" content="https://www.deepthinkai.app/images/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DeepThink AI Blog | Free AI Tools, Guides & Insights" />
        <meta name="twitter:description" content="Explore the DeepThink AI Blog for the latest on free AI tools, content creation, image generation, SEO, monetization, and more. Discover how to supercharge your workflow with DeepThink AI." />
        <meta name="twitter:image" content="https://www.deepthinkai.app/images/logo.png" />
        <meta name="twitter:url" content="https://www.deepthinkai.app/blog" />
      </Helmet>
      {/* HERO SECTION WITH VIDEO/IMAGE */}
      <Box sx={{
        pt: { xs: 6, md: 10 },
        pb: { xs: 4, md: 8 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}>
        <Box sx={{
          bgcolor: 'rgba(255,255,255,0.95)',
          borderRadius: 6,
          boxShadow: '0 4px 24px rgba(255,102,0,0.13)',
          border: '2px solid #ff6600',
          p: { xs: 1, md: 2 },
          mb: 4,
          maxWidth: 480,
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Box sx={{ position: 'relative', width: '100%', height: { xs: 220, md: 320 }, overflow: 'hidden', borderRadius: 4 }}>
            <video
              ref={videoRef}
              src="/images/2.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, boxShadow: '0 2px 16px rgba(255,102,0,0.10)' }}
              poster="/images/android-chrome-512x512.png"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            >
              Sorry, your browser does not support embedded videos.
            </video>
            {!isVideoPlaying && (
              <PlayCircleFilledWhiteIcon
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 64,
                  color: '#ff6600',
                  opacity: 0.85,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 1 }
                }}
                onClick={() => {
                  if (videoRef.current) videoRef.current.play();
                }}
              />
            )}
          </Box>
        </Box>
        {/* CTA BUTTON */}
        <Button
          variant="contained"
          size="large"
          sx={{
            fontWeight: 700,
            fontSize: '1.3rem',
            px: 5,
            py: 2,
            mb: 4,
            borderRadius: 2,
            background: '#ff6600',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(255,102,0,0.18)',
            '&:hover': { background: '#ff8533' }
          }}
          onClick={() => window.location.href = '/'}
        >
          Try our FREE DEEPTHINK AI tools now
        </Button>
        {/* STATS/FEATURES BAR */}
        <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 900, mx: 'auto', mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3, textAlign: 'center', boxShadow: 1, border: `1.5px solid ${theme.palette.primary.light}` }}>
              <PeopleIcon sx={{ fontSize: 32, mb: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>10,000+ Users</Typography>
              <Typography variant="body2" color="text.secondary">People have used Deepthink AI tools.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3, textAlign: 'center', boxShadow: 1, border: `1.5px solid ${theme.palette.primary.light}` }}>
              <SchoolIcon sx={{ fontSize: 32, mb: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>6 Powerful AI Tools</Typography>
              <Typography variant="body2" color="text.secondary">Content, Images, SEO, Monetization, Outreach, and more.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3, textAlign: 'center', boxShadow: 1, border: `1.5px solid ${theme.palette.primary.light}` }}>
              <SupportAgentIcon sx={{ fontSize: 32, mb: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>All-in-One Platform</Typography>
              <Typography variant="body2" color="text.secondary">For creators, marketers, and entrepreneurs.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3, textAlign: 'center', boxShadow: 1, border: `1.5px solid ${theme.palette.primary.light}` }}>
              <MonetizationOnIcon sx={{ fontSize: 32, mb: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>100% Free</Typography>
              <Typography variant="body2" color="text.secondary">No credit card needed. Start instantly.</Typography>
            </Box>
          </Grid>
        </Grid>
        {/* PROMPT INSPIRATION SECTION */}
        <Box sx={{
          bgcolor: '#fff7f0',
          py: { xs: 4, md: 6 },
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 3,
          border: '1.5px solid #ffb366',
        }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#ff6600' }}>
            Prompt Inspiration
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, textAlign: 'center' }}>
            Get inspired by top AI-generated images and prompts from the community. Explore creative ideas and see what's possible with Deepthink AI and PromptHero!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
            <img src="/images/blog/prompthero-prompt-9503d8ce603.webp" alt="PromptHero Sample 1" style={{ width: 180, borderRadius: 12, boxShadow: '0 2px 8px #ff660022', border: '1.5px solid #ffb366' }} onError={e => { e.currentTarget.src = '/images/android-chrome-512x512.png'; }} />
            <img src="/images/blog/prompthero-prompt-2479e948aee.webp" alt="PromptHero Sample 2" style={{ width: 180, borderRadius: 12, boxShadow: '0 2px 8px #ff660022', border: '1.5px solid #ffb366' }} onError={e => { e.currentTarget.src = '/images/android-chrome-512x512.png'; }} />
            <img src="/images/blog/prompthero-prompt-75f921002e7.webp" alt="PromptHero Sample 3" style={{ width: 180, borderRadius: 12, boxShadow: '0 2px 8px #ff660022', border: '1.5px solid #ffb366' }} onError={e => { e.currentTarget.src = '/images/android-chrome-512x512.png'; }} />
          </Box>
          <Button
            variant="outlined"
            href="https://prompthero.com/top"
            target="_blank"
            rel="noopener"
            sx={{ fontWeight: 600, mt: 1, borderColor: '#ff6600', color: '#ff6600', '&:hover': { borderColor: '#ff8533', color: '#ff8533', background: '#fff3e0' } }}
          >
            See More on PromptHero
          </Button>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Images & prompts courtesy of <a href="https://prompthero.com/top" target="_blank" rel="noopener" style={{ color: '#ff6600', textDecoration: 'underline' }}>PromptHero</a>
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link component={RouterLink} to="/" color="primary">
            Home
          </Link>
          <Typography color="primary.main">Blog</Typography>
        </Breadcrumbs>

        <Grid container spacing={6}>
          {/* Main Blog Grid */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {visiblePosts.map((post) => (
                <Grid item xs={12} sm={6} key={post.id}>
                  <CardActionArea 
                    component={RouterLink} 
                    to={`/blog/${post.id}`}
                    sx={{ height: '100%' }}
                  >
                    <BlogCard>
                      <CardMedia
                        component="img"
                        height="240"
                        image={post.image || '/images/android-chrome-512x512.png'}
                        alt={post.title}
                        onError={e => { e.currentTarget.src = '/images/android-chrome-512x512.png'; }}
                        sx={{
                          objectFit: 'cover',
                          borderBottom: `2px solid ${theme.palette.primary.light}`
                        }}
                      />
                      <StyledCardContent>
                        <Typography 
                          variant="caption" 
                          color="text.secondary" 
                          gutterBottom
                          sx={{ mb: 1 }}
                        >
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })} • {post.readTime}
                        </Typography>
                        <Typography 
                          variant="h5" 
                          component="h2" 
                          gutterBottom
                          sx={{ 
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            lineHeight: 1.3,
                            mb: 2,
                            color: 'primary.main'
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            fontSize: '1rem',
                            lineHeight: 1.6,
                            flexGrow: 1
                          }}
                        >
                          {post.content?.introduction?.slice(0, 120) + '...'}
                        </Typography>
                        <Typography 
                          variant="subtitle2" 
                          color="primary"
                          sx={{ 
                            mt: 2,
                            fontWeight: 600
                          }}
                        >
                          Read More →
                        </Typography>
                      </StyledCardContent>
                    </BlogCard>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
            {/* Infinite scroll sentinel */}
            {sortedPosts.length > 6 && visibleCount < sortedPosts.length && (
              <div ref={sentinelRef} style={{ height: 40 }} />
            )}
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <SidebarBox sx={{ border: '1.5px solid #ffb366', boxShadow: '0 2px 8px #ff660011', background: '#fff7f0' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#ff6600' }}>
                Recent Posts
              </Typography>
              {recentPosts.map((post) => (
                <Box key={post.id} sx={{ mb: 2 }}>
                  <Link component={RouterLink} to={`/blog/${post.id}`} color="primary" underline="hover">
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {post.title}
                    </Typography>
                  </Link>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
            </SidebarBox>
            <SidebarBox sx={{ border: '1.5px solid #ffb366', boxShadow: '0 2px 8px #ff660011', background: '#fff7f0' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#ff6600' }}>
                Most Viewed
              </Typography>
              {mostViewedPosts.map((post) => (
                <Box key={post.id} sx={{ mb: 2 }}>
                  <Link component={RouterLink} to={`/blog/${post.id}`} color="primary" underline="hover">
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {post.title}
                    </Typography>
                  </Link>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
            </SidebarBox>
          </Grid>
        </Grid>

        <Box 
          sx={{ 
            mt: 8, 
            p: 6, 
            bgcolor: '#ff6600', 
            borderRadius: 2,
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 4px 24px #ff660022'
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'white' }}>
            Ready to Transform Your Workflow?
          </Typography>
          <Typography sx={{ mb: 3, fontSize: '1.1rem', color: 'white' }}>
            All our AI tools are completely free to use. Start enhancing your productivity today!
          </Typography>
          <Link 
            component={RouterLink} 
            to="/" 
            sx={{ 
              color: 'white',
              textDecoration: 'underline',
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                color: '#ffb366',
              }
            }}
          >
            Try Our Free Tools Now →
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogPage; 