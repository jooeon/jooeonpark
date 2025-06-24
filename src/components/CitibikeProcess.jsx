import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import {Link} from "react-router-dom";

const CitibikeProcess = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 8;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrevSlide();
      } else if (event.key === 'ArrowRight') {
        handleNextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const slides = [
    {
      id: 0,
      title: "Prompt and Dataset Selection",
      content: "Setting the foundation for our creative journey"
    },
    {
      id: 1,
      title: "Brainstorming with Gemini",
      content: "Exploring possibilities and expanding creative horizons"
    },
    {
      id: 2,
      title: "Polishing Idea and Prompt Generation with Claude",
      content: "Overcoming challenges with strategic problem-solving"
    },
    {
      id: 3,
      title: "Building Application with Bolt.new",
      content: "I went ahead and started building quickly with bolt.new"
    },
    {
      id: 4,
      title: "Back to Ideation with Gemini",
      content: "I went ahead and started building quickly with bolt.new"
    },{
      id: 5,
      title: "Polishing Idea and Prompt Generation with Claude (Take 2)",
      content: "I went ahead and started building quickly with bolt.new"
    },
    {
      id: 6,
      title: "Building Application with Bolt.new",
      content: "Building the visualization through iterative development"
    },
    {
      id: 7,
      title: "Final Showcase",
      content: "Presenting the completed vision"
    }
  ];

  const renderSlideContent = () => {
    switch (currentSlide) {
      case 0:
        return (
          <div className="space-y-[6vh]">
            {/* Slide Title */}
            <h1 className="font-neueHaasGrotesk font-bold text-[5vw] text-center leading-tight mb-4 md:mb-6">
              Prompt and Dataset Selection
            </h1>

            {/* The Prompt Section */}
            <div className="mx-auto space-y-[5vh]">
              <h2 className="font-neueHaasGrotesk font-semibold text-[3vw] text-white text-center">
                The Prompt
              </h2>

              <div className="mx-auto w-1/2">
                <p className="text-[2vw] text-gray-300 leading-relaxed text-center">
                  &#34;Use data from a spreadsheet to drive a visual or spatial representation. Let GenAI interpret structure, trends, or anomalies artistically.&#34;
                </p>
              </div>
            </div>

            {/* Visual Divider */}
            <div className="flex justify-center my-8 md:my-12">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            </div>

            {/* Selected Dataset Section */}
            <div className=" mx-auto space-y-[5vh]">
              <h2 className="font-neueHaasGrotesk font-semibold text-[3vw] text-white text-center">
                Selected Dataset
              </h2>

              <div className="xl:space-y-[3vh] text-center">
                <h3 className="font-neueHaasGrotesk font-medium text-[2vw] text-gray-100">
                  NYC Citi Bike Trip Histories
                </h3>

                <a
                  href="https://citibikenyc.com/system-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-[2vw] text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
                >
                  <span>https://citibikenyc.com/system-data</span>
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-[6vh]">
            {/* Slide Title */}
            <h1 className="font-neueHaasGrotesk font-bold text-[5vw] text-center leading-tight mb-4 md:mb-6">
              Brainstorming with Gemini
            </h1>

            {/* Subtext */}
            <p className="text-[2vw] text-blue-300 text-center mx-auto mb-8 md:mb-12">
              I asked Gemini to analyze the dataset and generate creative visualization ideas.
            </p>

            {/* Chat Interface */}
            <div className=" mx-auto space-y-[5vh]">

              {/* User Message 1 */}
              <div className="flex justify-end">
                <div
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-br-md p-[2vw]">
                  <p className="text-[1.5vw] text-white leading-relaxed">
                    Analyze this NYC Citi Bike dataset and give me 5 creative ideas that satisfy the &#39;Draw with a
                    Spreadsheet&#39; prompt
                  </p>
                </div>
              </div>

              {/* Gemini Response 1 */}
              <div className="flex justify-start">
                <div
                    className="bg-blue-900/40 border border-blue-700/30 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-bl-md p-[2vw]">
                  <div className="mb-3">
                    <span className="text-[1.5vw] text-blue-400 font-medium">Gemini</span>
                  </div>
                  <div className="text-[1.5vw] text-gray-200 leading-relaxed space-y-3">
                    <p className="font-medium text-white">Here are 5 creative visualization ideas:</p>
                    <div className="space-y-2 text-gray-300">
                      <p><span className="text-blue-400">1.</span> <span
                          className="font-medium">Flowing Currents:</span> Animated lines visualize dynamic bike
                        journeys on an NYC map.</p>
                      <p><span className="text-blue-400">2.</span> <span
                          className="font-medium">Ephemeral Blossoms:</span> Stations are
                        abstract &#34;blossoms&#34; reflecting real-time bike activity.</p>
                      <p><span className="text-blue-400">3.</span> <span
                          className="font-medium">Rider Constellations:</span> Aggregated trips form
                        glowing &#34;constellations&#34; showing major routes.</p>
                      <p><span className="text-blue-400">4.</span> <span
                          className="font-medium">Echoes of Journeys:</span> Animated &#34;ghost&#34; rides trace
                        history on a distance-themed map.</p>
                      <p><span className="text-blue-400">5.</span> <span
                          className="font-medium">Synchronized Symphony:</span> Trip times create abstract, synchronized
                        visual and audio patterns.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[2vw] text-blue-300 text-center mx-auto mb-8 md:mb-12">
                I selected an idea that I liked and asked Gemini to summarize the project requirements.
              </p>

              {/* User Message 2 */}
              <div className="flex justify-end">
                <div
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-br-md p-[2vw]">
                  <p className="text-[1.5vw] text-white leading-relaxed">
                    I like idea #2. Can you polish it and give me a digestible summary of the project requirements?
                  </p>
                </div>
              </div>

              <div className="flex justify-start">
                <div
                    className="bg-blue-900/40 border border-blue-700/30 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-bl-md p-[2vw]">
                  <div className="mb-3">
                    <span className="text-[1.5vw] text-blue-400 font-medium">Gemini</span>
                  </div>
                  <div className="text-[1.5vw] text-gray-200 leading-relaxed xl:space-y-[3vh]">
                    <p className="font-medium text-white">Refined Concept: &#34;Ephemeral Blossoms&#34;</p>
                    <p className="text-gray-300">
                      Transform NYC Citi Bike station activity into an organic, living map where each station is an
                      abstract &#34;blossom&#34; that visually grows or wilts based on bike arrivals and departures.
                    </p>
                    <div className="space-y-2">
                      <p className="font-medium text-blue-300">Key Requirements:</p>
                      <ul className="space-y-1 text-gray-300 ml-4">
                        <li>• Map Citi Bike stations across NYC.</li>
                        <li>• Represent each station as a unique, abstract botanical form (e.g., a flower, plant).</li>
                        <li>• Animate the &#34;blossoming&#34; (growing, changing color, sprouting elements) of a station when a
                          bike arrives.
                        </li>
                        <li>• Animate the &#34;wilting&#34; (shrinking, fading, changing color) of a station when a bike
                          departs.
                        </li>
                        <li>• Scale the &#34;blossom&#39;s&#34; size/complexity to reflect the station&#39;s overall activity or
                          capacity over time.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        );

      case 2:
        return (
            <div className="space-y-[6vh]">
              {/* Slide Title */}
              <h1 className="font-neueHaasGrotesk font-bold text-[5vw] text-center leading-tight mb-4 md:mb-6">
                Polishing Idea and Prompt Generation with Claude
              </h1>

              {/* Subtext */}
              <p className="text-[2vw] text-orange-300 text-center mx-auto mb-8 md:mb-12">
                I asked Claude to identify potential obstacles for the &#34;Ephemeral Blossoms&#34; idea and address them.
              </p>

              {/* Chat Interface */}
              <div className=" mx-auto space-y-[5vh]">

                {/* User Message 1 */}
                <div className="flex justify-end">
                  <div
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-br-md p-[2vw]">
                    <p className="text-[1.5vw] text-white leading-relaxed">
                      Here&#39;s Gemini&#39;s &#34;Ephemeral Blossoms&#34; project summary. Can you identify 10 potential obstacles and
                      technical
                      limitations, then address them and rewrite the summary?
                    </p>
                  </div>
                </div>

                {/* Claude Response 1 */}
                <div className="flex justify-start">
                  <div
                      className="bg-orange-900/40 border border-orange-700/30 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-bl-md p-[2vw]">
                    <div className="mb-3">
                      <span className="text-[1.5vw] text-orange-400 font-medium">Claude</span>
                    </div>
                    <div className="text-[1.5vw] text-gray-200 leading-relaxed space-y-3">
                      <p className="font-medium text-white">I&#39;ve identified key obstacles like custom marker rendering,
                        activity simulation performance, and animation smoothness across many stations.</p>
                      <div className="space-y-2 text-gray-300">
                        <p className="font-medium text-orange-300">Revised Summary:</p>
                        <p>Create an interactive web visualization using a performant rendering library (e.g., D3.js
                          with SVG/Canvas) to display NYC Citi Bike stations as dynamic, abstract botanical markers.
                          Focus on efficient custom marker animation, scalable activity simulation, and fluid map
                          interaction for &#34;blossom&#34; growth and wilting.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtext for second section */}
                <div className="text-center py-4">
                  <p className="text-[2vw] text-orange-300 mx-auto">
                    Then I asked Claude to divide the project into step-by-step manageable chunks.
                  </p>
                </div>

                {/* User Message 2 */}
                <div className="flex justify-end">
                  <div
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-br-md p-[2vw]">
                    <p className="text-[1.5vw] text-white leading-relaxed">
                      Now create step-by-step instructions separated into manageable chunks for Bolt.new
                    </p>
                  </div>
                </div>

                {/* Claude Response 2 */}
                <div className="flex justify-start">
                  <div
                      className="bg-orange-900/40 border border-orange-700/30 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-bl-md p-[2vw]">
                    <div className="mb-3">
                      <span className="text-[1.5vw] text-orange-400 font-medium">Claude</span>
                    </div>
                    <div className="text-[1.5vw] text-gray-200 leading-relaxed space-y-3">
                      <p className="font-medium text-white">Here&#39;s your step-by-step breakdown:</p>
                      <div className="space-y-2 text-gray-300">
                        <p><span className="text-orange-400">Step 1:</span> Basic map setup with station markers as
                          initial abstract forms</p>
                        <p><span className="text-orange-400">Step 2:</span> Implement simulated station activity data
                          and state management
                        </p>
                        <p><span className="text-orange-400">Step 3:</span> Develop blossom growth and wilting
                          animations based on activity
                        </p>
                        <p><span className="text-orange-400">Step 4:</span> Create interactive controls (zoom/pan, click
                          for details)</p>
                        <p><span className="text-orange-400">Step 5:</span> Optimize rendering performance and refine
                          visual polish</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center py-4">
                  <p className="text-[2vw] text-orange-300 mx-auto">
                    Then generated a prompt for each step.
                  </p>
                </div>

                {/* User Message 3 */}
                <div className="flex justify-end">
                  <div
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-br-md p-[2vw]">
                    <p className="text-[1.5vw] text-white leading-relaxed">
                      Generate a prompt for step 1
                    </p>
                  </div>
                </div>

                {/* Claude Response 3 */}
                <div className="flex justify-start">
                  <div
                      className="bg-orange-900/40 border border-orange-700/30 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-bl-md p-[2vw]">
                    <div className="mb-3">
                      <span className="text-[1.5vw] text-orange-400 font-medium">Claude</span>
                    </div>
                    <div className="text-[1.5vw] text-gray-200 leading-relaxed space-y-3">
                      <p className="font-medium text-white">Here&#39;s your first Bolt.new prompt:</p>
                      <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                        <p className="text-gray-300 text-[1.25vw]">
                          &#34;Create a React component with an interactive NYC map using Leaflet. Display Citi Bike
                          stations as static, initial abstract botanical markers (e.g., simple circles or polygons) with
                          a dark theme. Include basic zoom/pan controls and ensure the layout is clean and responsive.&#34;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
        );

      case 3:
        return (
            <div className="space-y-[6vh]">
              {/* Slide Title */}
              <h1 className="font-neueHaasGrotesk font-bold text-[5vw] text-center leading-tight mb-4 md:mb-6">
                Building Application with Bolt.new
              </h1>

              {/* Subtext */}
              <p className="text-[2vw] text-green-300 text-center mx-auto mb-8 md:mb-12">
                I went ahead and started building quickly with Bolt.new
              </p>

              {/* Content Sections */}
              <div className=" mx-auto space-y-12 md:space-y-16">

                {/* Section 1: Initial Generation */}
                <div className="space-y-[6vh]">

                  <div className="space-y-[6vh]">
                    {/* User Prompt */}
                    <div className="flex justify-end">
                      <div
                          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-br-md p-[2vw]">
                        <p className="text-[1.5vw] text-white leading-relaxed">
                          &#34;Create a web application prototype visualizing NYC Citi Bike station activity. Display an
                          interactive map with stations represented by abstract, animated &#34;blossom&#34; markers that grow,
                          shrink, and change color based on simulated bike arrivals and departures...&#34;
                        </p>
                      </div>
                    </div>

                    {/* Bolt.new Response Area */}
                    <div className="flex justify-center">
                      <div className="bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden w-[75vw]">
                        <img
                            src="/images/bad-idea.png"
                            alt="bad_idea_image"
                            loading="lazy"
                            className="w-full"/>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[2vw] text-green-300 text-center mx-auto mb-8 md:mb-12">
                  This was cool, but it didn&#39;t represent bike paths effectively so I pivoted to another idea.
                </p>

              </div>
            </div>
        );

      case 4:
        return (
            <div className="space-y-[6vh]">
              {/* Slide Title */}
              <h1 className="font-neueHaasGrotesk font-bold text-[5vw] text-center leading-tight mb-4 md:mb-6">
                Back to Ideation with Gemini
              </h1>

              {/* Subtext */}
              <p className="text-[2vw] text-blue-300 text-center mx-auto mb-8 md:mb-12">
                I went back to Gemini and selected an idea that would work better.
              </p>

              {/* Chat Interface */}
              <div className=" mx-auto space-y-[5vh]">

                {/* Gemini Response 1 */}
                <div className="flex justify-start">
                  <div
                      className="bg-blue-900/40 border border-blue-700/30 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-bl-md p-[2vw]">
                    <div className="mb-3">
                      <span className="text-[1.5vw] text-blue-400 font-medium">Gemini</span>
                    </div>
                    <div className="text-[1.5vw] text-gray-200 leading-relaxed space-y-3">
                      <p className="font-medium text-white">Here are 5 creative visualization ideas:</p>
                      <div className="space-y-2 text-gray-300">
                        <p><span className="text-blue-400">1.</span> <span
                            className="font-medium">Flowing Currents:</span> Animated lines visualize dynamic bike
                          journeys on an NYC map.</p>
                        <p><span className="text-blue-400">2.</span> <span
                            className="font-medium">Ephemeral Blossoms:</span> Stations are
                          abstract &#34;blossoms&#34; reflecting real-time bike activity.</p>
                        <p><span className="text-blue-400">3.</span> <span
                            className="font-medium">Rider Constellations:</span> Aggregated trips form
                          glowing &#34;constellations&#34; showing major routes.</p>
                        <p><span className="text-blue-400">4.</span> <span
                            className="font-medium">Echoes of Journeys:</span> Animated &#34;ghost&#34; rides trace
                          history on a distance-themed map.</p>
                        <p><span className="text-blue-400">5.</span> <span
                            className="font-medium">Synchronized Symphony:</span> Trip times create abstract, synchronized
                          visual and audio patterns.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[2vw] text-blue-300 text-center mx-auto mb-8 md:mb-12">
                  I selected idea #4 this time as I thought it would represent bike paths well.
                </p>

                {/* User Message 2 */}
                <div className="flex justify-end">
                  <div
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-br-md p-[2vw]">
                    <p className="text-[1.5vw] text-white leading-relaxed">
                      I like idea #4. Can you polish it and give me a digestible summary of the project requirements?
                    </p>
                  </div>
                </div>

                {/* Gemini Response 2 */}
                <div className="flex justify-start">
                  <div
                      className="bg-blue-900/40 border border-blue-700/30 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-bl-md p-[2vw]">
                    <div className="mb-3">
                      <span className="text-[1.5vw] text-blue-400 font-medium">Gemini</span>
                    </div>
                    <div className="text-[1.5vw] text-gray-200 leading-relaxed xl:space-y-[3vh]">
                      <p className="font-medium text-white">Refined Concept: &#34;Echoes of Journeys&#34;</p>
                      <p className="text-gray-300">
                        Transform NYC Citi Bike trip data into an animated visualization where historical bike journeys
                        appear as translucent &#34;ghost&#34; rides that trace across a distance-themed map of Manhattan.
                      </p>
                      <div className="space-y-2">
                        <p className="font-medium text-blue-300">Key Requirements:</p>
                        <ul className="space-y-1 text-gray-300 ml-4">
                          <li>• Map bike stations with distance-based color gradients</li>
                          <li>• Animate historical trip paths as flowing ghost trails</li>
                          <li>• Layer temporal data to show usage patterns over time</li>
                          <li>• Create interactive controls for time period selection</li>
                          <li>• Implement smooth trail animations with fade effects</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
        );

      case 5:
        return (
            <div className="space-y-[6vh]">
              {/* Slide Title */}
              <h1 className="font-neueHaasGrotesk font-bold text-[5vw] text-center leading-tight mb-4 md:mb-6">
                Polishing Idea and Prompt Generation with Claude (Take 2)
              </h1>

              {/* Subtext */}
              <p className="text-[2vw] text-orange-300 text-center mx-auto mb-8 md:mb-12">
                I asked Claude to identify potential obstacles for the idea and address them.
              </p>

              {/* Chat Interface */}
              <div className=" mx-auto space-y-[5vh]">

                {/* User Message 1 */}
                <div className="flex justify-end">
                  <div
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-br-md p-[2vw]">
                    <p className="text-[1.5vw] text-white leading-relaxed">
                      Here&#39;s Gemini&#39;s project summary. Can you identify 10 potential obstacles and technical
                      limitations, then address them and rewrite the summary?
                    </p>
                  </div>
                </div>

                {/* Claude Response 1 */}
                <div className="flex justify-start">
                  <div
                      className="bg-orange-900/40 border border-orange-700/30 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-bl-md p-[2vw]">
                    <div className="mb-3">
                      <span className="text-[1.5vw] text-orange-400 font-medium">Claude</span>
                    </div>
                    <div className="text-[1.5vw] text-gray-200 leading-relaxed space-y-3">
                      <p className="font-medium text-white">I&#39;ve identified key obstacles like data processing
                        performance, animation smoothness, and map rendering complexity.</p>
                      <div className="space-y-2 text-gray-300">
                        <p className="font-medium text-orange-300">Revised Summary:</p>
                        <p>Create an interactive web visualization using D3.js and Canvas API to render NYC Citi Bike
                          trip data as animated &#34;ghost trails&#34; on a simplified map. Focus on data sampling,
                          efficient rendering, and progressive enhancement for performance.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtext for second section */}
                <div className="text-center py-4">
                  <p className="text-[2vw] text-orange-300 mx-auto">
                    Then I asked Claude to divide the project into step-by-step manageable chunks.
                  </p>
                </div>

                {/* User Message 2 */}
                <div className="flex justify-end">
                  <div
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-br-md p-[2vw]">
                    <p className="text-[1.5vw] text-white leading-relaxed">
                      Now create step-by-step instructions separated into manageable chunks for Bolt.new
                    </p>
                  </div>
                </div>

                {/* Claude Response 2 */}
                <div className="flex justify-start">
                  <div
                      className="bg-orange-900/40 border border-orange-700/30 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-bl-md p-[2vw]">
                    <div className="mb-3">
                      <span className="text-[1.5vw] text-orange-400 font-medium">Claude</span>
                    </div>
                    <div className="text-[1.5vw] text-gray-200 leading-relaxed space-y-3">
                      <p className="font-medium text-white">Here&#39;s your step-by-step breakdown:</p>
                      <div className="space-y-2 text-gray-300">
                        <p><span className="text-orange-400">Step 1:</span> Basic map setup with station markers</p>
                        <p><span className="text-orange-400">Step 2:</span> Data processing and trip path calculation
                        </p>
                        <p><span className="text-orange-400">Step 3:</span> Animation system and ghost trail rendering
                        </p>
                        <p><span className="text-orange-400">Step 4:</span> Interactive controls and time filtering</p>
                        <p><span className="text-orange-400">Step 5:</span> Performance optimization and polish</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center py-4">
                  <p className="text-[2vw] text-orange-300 mx-auto">
                    Then generated a prompt for each step.
                  </p>
                </div>

                {/* User Message 3 */}
                <div className="flex justify-end">
                  <div
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-br-md p-[2vw]">
                    <p className="text-[1.5vw] text-white leading-relaxed">
                      Generate a prompt for step 1
                    </p>
                  </div>
                </div>

                {/* Claude Response 3 */}
                <div className="flex justify-start">
                  <div
                      className="bg-orange-900/40 border border-orange-700/30 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-bl-md p-[2vw]">
                    <div className="mb-3">
                      <span className="text-[1.5vw] text-orange-400 font-medium">Claude</span>
                    </div>
                    <div className="text-[1.5vw] text-gray-200 leading-relaxed space-y-3">
                      <p className="font-medium text-white">Here&#39;s your first Bolt.new prompt:</p>
                      <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                        <p className="text-gray-300 text-[1.25vw]">
                          &#34;Create a React component with an interactive NYC map using Leaflet. Display Citi Bike
                          stations as colored markers based on distance from Manhattan center. Include basic zoom/pan
                          controls and a clean, dark theme suitable for data visualization...&#34;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
        );

      case 6:
        return (
            <div className="space-y-[6vh]">
              {/* Slide Title */}
              <h1 className="font-neueHaasGrotesk font-bold text-[5vw] text-center leading-tight mb-4 md:mb-6">
              Building Application with Bolt.new
            </h1>

            {/* Subtext */}
            <p className="text-[2vw] text-green-300 text-center mx-auto mb-8 md:mb-12">
              Using prompts generated by Claude I instructed Bolt.new to create the app.
            </p>

            {/* Content Sections */}
              <div className=" mx-auto space-y-12 md:space-y-16">

                {/* Section 1: Initial Generation */}
                <div className="space-y-[6vh]">
                  <h2 className="font-neueHaasGrotesk font-semibold text-[2vw] text-white text-center">
                    1. Initial Generation
                  </h2>

                  <div className="space-y-[6vh]">
                    {/* User Prompt */}
                    <div className="flex justify-end">
                      <div
                          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-br-md p-[2vw]">
                        <p className="text-[1.5vw] text-white leading-relaxed">
                          &#34;Create a React component with an interactive NYC map using Leaflet. Display Citi Bike
                          stations as colored markers based on distance from Manhattan center. Include basic zoom/pan
                          controls and a clean, dark theme suitable for data visualization...&#34;
                        </p>
                      </div>
                    </div>

                    {/* Bolt.new Response Area */}
                    <div className="flex justify-center">
                      <div className="bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden w-[75vw]">
                        <img
                            src="/images/presentation_initial.png"
                            alt="Initial_generation_image"
                            loading="lazy"
                            className="w-full"/>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[2vw] text-green-300 text-center mx-auto mb-8 md:mb-12">
                  While not perfect, this was a much more promising start.
                </p>

                {/* Section 2: Incrementally Building & Troubleshooting */}
                <div className="space-y-[6vh]">
                  <h2 className="font-neueHaasGrotesk font-semibold text-[2vw] text-white text-center">
                    2. Incrementally Building & Troubleshooting
                  </h2>

                  <div className="space-y-[6vh]">
                    {/* User Prompt */}
                    <div className="flex justify-end">
                      <div
                          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-br-md p-[2vw]">
                        <p className="text-[1.5vw] text-white leading-relaxed">
                          &#34;Fix the data loading issue and add animated ghost trail functionality with trip path
                          calculations and smooth animations&#34;
                        </p>
                      </div>
                    </div>

                    {/* Bolt.new Response Area */}
                    <div className="flex justify-center">
                      <div className="bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden w-[75vw]">
                        <img
                            src="/images/presentation_progress.png"
                            alt="Progess_generation_image"
                            loading="lazy"
                            className="w-full"/>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[2vw] text-green-300 text-center mx-auto mb-8 md:mb-12">
                  I continued to prompt with the help of Claude to tailor the application to my intentions.
                </p>

                {/* Section 3: Final Generation */}
                <div className="space-y-[6vh]">
                  <h2 className="font-neueHaasGrotesk font-semibold text-[2vw] text-white text-center">
                    3. Final Generation
                  </h2>

                  <div className="space-y-[6vh]">
                    {/* User Prompt */}
                    <div className="flex justify-end">
                      <div
                          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl 4xl:rounded-3xl max-w-[75vw] rounded-br-md p-[2vw]">
                        <p className="text-[1.5vw] text-white leading-relaxed">
                          &#34;Polish the final details with enhanced UI, performance optimizations, and refined visual
                          effects
                          for the ghost trail animations&#34;
                        </p>
                      </div>
                    </div>

                    {/* Bolt.new Response Area */}
                    <div className="flex flex-wrap justify-center gap-[5vh]">
                      <div className="bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden w-[75vw]">
                        <img
                            src="/images/presentation_final_3.png"
                            alt="Final_generation_image"
                            loading="lazy"
                            className="w-full"/>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden w-[75vw]">
                        <img
                            src="/images/presentation_final.png"
                            alt="Final_generation_image"
                            loading="lazy"
                            className="w-full"/>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden w-[75vw]">
                        <img
                            src="/images/presentation_final_2.png"
                            alt="Final_generation_image"
                            loading="lazy"
                            className="w-full"/>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
        );

      case 7:
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center space-y-[6vh]">
                {/* Main Title */}
                <h1 className="font-neueHaasGrotesk font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
                  Final Showcase
                </h1>

                <p className="text-[2vw] text-purple-300 text-center mx-auto mb-8 md:mb-12">
                  Finally, I exported the code and deployed the app on Netlify.
                </p>

                {/* View Project Button */}
                <div className="xl:space-y-[5vh]">
                  <a href={"https://nyccitibike.netlify.app/"} target={"_blank"}>
                    <button
                        className="group inline-flex items-center space-x-3 px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-[2vw] rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-blue-500/20">
                      <span>View Project</span>
                      <ExternalLink
                          className="w-[2vw] h-[2vw] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"/>
                    </button>
                  </a>

                  {/* Attribution text below button */}
                  <p className="text-[1.5vw] text-gray-500">
                    This presentation was built with Claude and Bolt.new
                  </p>

                  <Link to={"/"}
                        className="text-link after:bg-customBlack dark:after:bg-customWhite text-[1.5vw]">
                    jooeonpark.com
                  </Link>

                </div>
              </div>
            </div>
        );

      default:
        return (
            <div className="text-center space-y-[6vh]">
              {/* Slide Title */}
              <h1 className="font-neueHaasGrotesk font-bold text-[5vw] leading-tight">
                {slides[currentSlide].title}
              </h1>

              {/* Slide Content */}
            <div className="mx-auto">
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
                {slides[currentSlide].content}
              </p>
            </div>

            {/* Placeholder for Future Content */}
            <div className="mt-12 md:mt-16 min-h-[200px] flex items-center justify-center">
              <div className="w-full max-w-2xl h-48 md:h-56 bg-gray-900 rounded-lg border border-gray-800 flex items-center justify-center">
                <p className="text-gray-500 text-[1.5vw]">
                  Content placeholder for slide {currentSlide + 1}
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-[4vw]">
        <div className="w-full">
          {/* Slide Content */}
          <div
            role="region"
            aria-label={`Slide ${currentSlide + 1} of ${totalSlides}`}
          >
            {renderSlideContent()}
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="p-[2vw]">
        <div className=" mx-auto">
          {/* Slide Indicators */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white' 
                      : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className={`flex items-center space-x-2 px-4 py-2 md:px-6 md:py-3 rounded-lg text-[1.5vw] transition-all duration-300 ${
                currentSlide === 0
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-white hover:bg-gray-900 border border-gray-800 hover:border-gray-600'
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-[2vw] h-[1.5vw]" />
              <span>Back</span>
            </button>

            {/* Slide Counter */}
            <div className="text-[1.5vw] text-gray-400">
              <span className="text-white font-medium">{currentSlide + 1}</span>
              <span className="mx-2">/</span>
              <span>{totalSlides}</span>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`flex items-center space-x-2 px-4 py-2 md:px-6 md:py-3 rounded-lg text-[1.5vw] transition-all duration-300 ${
                currentSlide === totalSlides - 1
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-white hover:bg-gray-900 border border-gray-800 hover:border-gray-600'
              }`}
              aria-label="Next slide"
            >
              <span>Next</span>
              <ChevronRight className="w-[2vw] h-[1.5vw]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitibikeProcess;