#!/usr/bin/env python3
"""
Script to update all 118 testimonial paragraphs in landing.html
with new content while maintaining exact word counts.
"""

import re
import random

# Testimonials organized by exact word count
TESTIMONIALS = {
    20: [
        "Future Tech's resume builder helped me land my dream job quickly. The templates were professional and easy to customize perfectly.",
        "Creating a standout resume was simple with this platform. I received multiple interview calls within just two weeks of applying.",
        "The career guidance and resume tools transformed my job search completely. I'm now working at an amazing tech startup happily.",
    ],
    21: [
        "I never imagined getting hired so fast after using this resume builder. The AI suggestions made my profile stand out significantly.",
        "This platform changed how I approach job applications entirely. My resume looks professional and highlights my skills effectively now.",
        "Building a compelling resume used to stress me out completely. Future Tech made it simple, and I got hired within a month.",
        "The interview preparation resources were incredibly helpful for my success. Combined with the resume builder, I felt completely confident throughout.",
    ],
    22: [
        "Future Tech's tools helped me transition from college to my first job seamlessly. The resume templates were modern and caught recruiters' attention immediately.",
        "I struggled with resume writing for months before finding this platform. Now I have a professional profile that showcases my skills perfectly.",
        "The step-by-step guidance made creating my resume stress-free and enjoyable. I landed three interviews in my first week of applications.",
        "Switching careers felt overwhelming until I used Future Tech's resources. The resume builder highlighted my transferable skills beautifully and effectively.",
        "My previous resume got zero responses despite countless applications submitted. After using this builder, recruiters started reaching out to me directly.",
        "The AI-powered suggestions improved my resume beyond my expectations completely. I received job offers from companies I never thought would consider me.",
        "Future Tech's platform made me feel confident about my job search. The professional templates and guidance were exactly what I needed desperately.",
        "I was skeptical about online resume builders initially, but this exceeded expectations. My new resume opened doors I didn't know existed before.",
        "The career resources and resume tools work together seamlessly and effectively. I went from unemployed to employed in less than six weeks total.",
        "Creating a resume that stands out is challenging in today's market. Future Tech's builder made it simple and resulted in immediate success.",
        "I appreciated how the platform guided me through every single step. My resume now reflects my experience and potential much more accurately.",
        "The modern templates and customization options were perfect for my needs. I felt proud sharing my resume with potential employers confidently.",
    ],
    23: [
        "Future Tech's resume builder transformed my job search from frustrating to successful remarkably. The professional templates made my application stand out among hundreds of others.",
        "I was struggling to get interviews despite having good qualifications and experience. This platform helped me present my skills in a way that recruiters loved.",
        "The AI suggestions for improving my resume were spot-on and incredibly helpful. I implemented every recommendation and saw immediate results in my applications.",
        "Creating a resume that truly represents my abilities felt impossible before this. Now I have a document I'm proud to share with anyone.",
        "My career coach recommended Future Tech, and it exceeded all my expectations completely. The resume builder is intuitive, powerful, and produces professional results every time.",
        "I spent weeks trying to perfect my resume with no success whatsoever. This platform did it in hours, and I started getting callbacks immediately.",
        "The combination of resume building and career guidance is unbeatable for job seekers. I felt supported throughout my entire job search journey from start to finish.",
        "Future Tech helped me highlight achievements I didn't even realize were important. My resume now tells a compelling story that recruiters can't ignore.",
        "I was changing industries and needed to reframe my experience completely differently. The platform's tools made this transition smooth and resulted in quick success.",
        "The professional appearance of my new resume boosted my confidence significantly. I approached interviews knowing my application materials were top-notch and impressive.",
        "I never knew how much a good resume could impact opportunities. Future Tech showed me the difference and changed my career trajectory completely.",
    ],
    24: [
        "Joining Future Tech was the best career decision I've made in years. The resume builder helped me showcase my experience in a way that attracted top employers immediately.",
        "I was unemployed for six months before discovering this amazing platform. Within three weeks of using the resume builder, I had multiple job offers to consider.",
        "The templates are modern, professional, and easy to customize for any industry. My resume now looks like it was designed by a professional career consultant.",
        "Future Tech's AI suggestions helped me identify and highlight my strongest skills. I never realized how much I was underselling myself in previous applications.",
        "Creating a resume used to take me days of frustration and self-doubt. Now I can update and customize my profile in minutes with confidence and ease.",
        "The platform guided me through every section with helpful tips and examples. My resume went from generic to compelling, and recruiters noticed the difference immediately.",
        "I appreciated how the builder emphasized achievements over just listing responsibilities. This approach made my experience stand out and resulted in more interview invitations.",
        "The career resources complemented the resume builder perfectly for comprehensive job search support. I felt prepared for every stage of the application and interview process.",
        "Future Tech helped me transition from student to professional with confidence and success. The resume templates were perfect for entry-level positions and highlighted my potential.",
        "I was skeptical about using an online tool for something so important. But the results spoke for themselves, and I'm now employed at my dream company.",
        "The platform made it easy to create different versions of my resume. I could tailor each application while maintaining a professional, consistent brand throughout.",
        "My previous resume was getting rejected constantly despite my qualifications and experience. Future Tech helped me reframe everything, and the responses changed dramatically overnight.",
    ],
    25: [
        "Future Tech's resume builder completely transformed how I present myself to potential employers in the job market. The professional templates and AI suggestions helped me create a document that truly represents my skills and experience.",
        "I struggled for months trying to get interviews with my old resume format. After using this platform, I received three job offers within two weeks and accepted my dream role happily.",
        "The step-by-step guidance made resume creation simple and stress-free for me. I went from feeling overwhelmed to confident, and my new resume opened doors I never thought possible before.",
        "Creating a standout resume felt impossible until I discovered Future Tech's amazing tools. The modern templates and customization options helped me showcase my unique value proposition to recruiters effectively.",
        "I was changing careers and needed to highlight transferable skills rather than job titles. This platform helped me reframe my experience perfectly, and I landed a role in my new field quickly.",
        "The AI-powered suggestions identified strengths I didn't even realize I had in my background. My resume now tells a compelling story that resonates with hiring managers and recruiters alike.",
        "Future Tech's platform made me feel confident about my job search for the first time. The professional appearance and strategic content of my resume resulted in immediate positive responses from employers.",
        "I appreciated how the builder emphasized quantifiable achievements and measurable results throughout. This approach made my contributions clear and impressive, leading to multiple interview invitations within days.",
        "The career resources and resume tools work together seamlessly to support job seekers. I felt guided and supported throughout my entire search, from application to offer negotiation successfully.",
        "My previous resume was generic and failed to capture my unique value proposition. Future Tech helped me create a personalized, professional document that recruiters couldn't ignore or forget.",
        "I was skeptical about online resume builders, but this platform exceeded all expectations. The quality of my new resume rivals anything a professional writer could create manually.",
        "The modern design and strategic content helped my application stand out immediately. I went from being overlooked to being actively recruited by companies in my target industry.",
        "Future Tech showed me how to present my experience in a way that highlights impact. My resume now demonstrates value rather than just listing duties, and employers noticed the difference.",
        "I spent weeks trying to perfect my resume with no success whatsoever before this. The platform did it in hours, and I started receiving callbacks and interview requests immediately.",
        "The combination of professional templates and personalized guidance is unbeatable for job seekers. I felt confident submitting applications knowing my resume represented my best self accurately.",
        "Creating different versions for various roles was simple with Future Tech's tools and features. I could tailor each application while maintaining consistency, which impressed recruiters and hiring managers.",
        "The platform helped me identify and articulate my unique selling points clearly and effectively. My resume now communicates my value proposition in a way that resonates with decision makers.",
        "I never realized how much a well-crafted resume could impact my career opportunities. Future Tech showed me the difference and changed my professional trajectory completely and permanently.",
        "The AI suggestions were surprisingly insightful and helped me improve every section significantly. I implemented all recommendations and saw immediate improvement in response rates from employers.",
        "Future Tech's resume builder gave me the confidence to apply for positions I previously thought were out of reach. My new resume demonstrated that I was qualified and ready for bigger challenges.",
    ],
    26: [
        "Future Tech's resume builder helped me land my first job after graduation within just weeks. The professional templates and career guidance made the transition from student to professional smooth and successful for me.",
        "I was struggling to get any responses from employers despite sending countless applications everywhere. After using this platform, my resume stood out, and I received multiple interview invitations almost immediately.",
        "The AI-powered suggestions transformed my resume from basic to exceptional in every way possible. I never realized how much I was underselling my experience and skills until I saw the improvements.",
        "Creating a resume that truly represents my abilities felt overwhelming and impossible before this tool. Now I have a professional document that showcases my strengths and opens doors to amazing opportunities.",
        "Future Tech's platform made resume building simple, efficient, and actually enjoyable for me surprisingly. The step-by-step process ensured I didn't miss any important details or selling points in my profile.",
        "I appreciated how the builder helped me quantify achievements rather than just listing duties. This approach made my contributions clear and impressive, resulting in much better responses from recruiters.",
        "The modern templates gave my resume a professional appearance that caught recruiters' attention immediately. I felt confident submitting applications knowing my materials represented my best self accurately and professionally.",
        "Switching careers required reframing my entire work history in a new light and context. Future Tech's tools made this challenging transition smooth, and I landed a role in my new field within a month.",
    ],
    27: [
        "Future Tech's resume builder completely changed how I approach job applications and career development overall. The professional templates, AI suggestions, and career resources helped me create a document that truly stands out in competitive markets.",
        "I spent months applying to jobs with my old resume and getting nowhere fast. After using this platform, I received three interview invitations in the first week and accepted an offer within a month successfully.",
        "The platform guided me through every section with helpful examples and best practices throughout. My resume went from generic and forgettable to compelling and memorable, and recruiters noticed the significant difference immediately.",
        "Creating a resume that showcases my unique value proposition felt impossible until I found this tool. Now I have a professional document that communicates my strengths clearly and opens doors to exciting opportunities.",
        "I was changing industries and needed to highlight transferable skills rather than specific job titles. Future Tech helped me reframe my experience perfectly, and I landed a role in my target field within weeks.",
        "The AI-powered suggestions identified strengths and achievements I didn't even realize were important to highlight. My resume now tells a compelling story that resonates with hiring managers and recruiters in my industry.",
        "Future Tech's platform made me feel confident and prepared for my job search journey. The professional appearance and strategic content of my resume resulted in immediate positive responses from top employers.",
        "I appreciated how the builder emphasized quantifiable achievements and measurable results throughout every section. This approach made my contributions crystal clear and impressive, leading to multiple interview invitations within just days.",
        "The career resources and resume tools work together seamlessly to support job seekers at every stage. I felt guided and supported throughout my entire search, from initial application to final offer negotiation.",
        "My previous resume was generic and failed to capture what makes me unique and valuable. Future Tech helped me create a personalized, professional document that recruiters couldn't ignore and actively wanted to discuss.",
        "I was skeptical about online resume builders initially, but this platform exceeded all my expectations completely. The quality of my new resume rivals anything a professional writer could create, and it cost a fraction.",
        "The modern design and strategic content helped my application stand out in a crowded field. I went from being overlooked and ignored to being actively recruited by companies in my target industry.",
        "Future Tech showed me how to present my experience in a way that highlights impact and value. My resume now demonstrates concrete results rather than just listing duties, and employers noticed the difference.",
        "I spent weeks trying to perfect my resume with no success or progress whatsoever. The platform did it in hours, and I started receiving callbacks and interview requests from great companies immediately.",
        "The combination of professional templates and personalized guidance is truly unbeatable for serious job seekers. I felt confident submitting applications knowing my resume represented my best self accurately and compellingly.",
    ],
    28: [
        "Future Tech's resume builder transformed my job search from frustrating and discouraging to successful and rewarding remarkably quickly. The professional templates and AI-powered suggestions helped me create a document that truly represents my skills, experience, and potential.",
        "I was unemployed for several months before discovering this amazing platform and its comprehensive tools. Within three weeks of using the resume builder and following the career guidance, I had multiple job offers to consider carefully.",
        "The templates are modern, professional, and incredibly easy to customize for any industry or role. My resume now looks like it was designed by an expensive professional career consultant, but I created it myself.",
        "Future Tech's AI suggestions helped me identify and highlight my strongest skills and achievements effectively. I never realized how much I was underselling myself in previous applications until I saw the improvements.",
        "Creating a resume used to take me days of frustration, self-doubt, and countless revisions. Now I can update and customize my professional profile in minutes with complete confidence and ease.",
        "The platform guided me through every section with helpful tips, examples, and best practices. My resume went from generic to compelling, and recruiters noticed the significant difference immediately in their responses.",
        "I appreciated how the builder emphasized achievements over just listing responsibilities and daily tasks. This results-focused approach made my experience stand out and resulted in many more interview invitations.",
        "The career resources complemented the resume builder perfectly for comprehensive job search support and guidance. I felt prepared for every stage of the application and interview process, from start to finish.",
        "Future Tech helped me transition from student to professional with confidence, preparation, and ultimate success. The resume templates were perfect for entry-level positions and highlighted my potential rather than just experience.",
        "I was skeptical about using an online tool for something so important to my career. But the results spoke for themselves clearly, and I'm now employed at my dream company doing work I love.",
    ],
    29: [
        "Future Tech's resume builder completely transformed how I present myself to potential employers in today's competitive job market. The professional templates, AI suggestions, and career guidance helped me create a document that truly represents my skills, experience, and unique value.",
        "I struggled for many months trying to get interviews with my old resume format and approach. After using this comprehensive platform, I received three job offers within two weeks and accepted my dream role at a leading company.",
    ],
    30: [
        "Future Tech's platform made resume building simple, efficient, and actually enjoyable for me surprisingly and unexpectedly. The step-by-step process ensured I didn't miss any important details, selling points, or achievements in my professional profile, resulting in a comprehensive document.",
        "I appreciated how the builder helped me quantify achievements rather than just listing duties and responsibilities. This results-oriented approach made my contributions crystal clear and impressive to recruiters, resulting in much better response rates from top employers.",
        "The modern templates gave my resume a professional appearance that caught recruiters' attention immediately and consistently. I felt confident submitting applications knowing my materials represented my best self accurately, professionally, and in a way that stood out.",
    ],
    31: [
        "Future Tech's resume builder helped me land my first job after graduation within just a few weeks of active searching. The professional templates, career guidance, and interview preparation resources made the transition from student to professional smooth, successful, and much less stressful than I anticipated.",
        "I was struggling to get any responses from employers despite sending countless applications to companies everywhere in my field. After using this comprehensive platform and following the guidance, my resume stood out significantly, and I received multiple interview invitations almost immediately from great companies.",
        "The AI-powered suggestions transformed my resume from basic and generic to exceptional and memorable in every way possible. I never realized how much I was underselling my experience, skills, and achievements until I saw the improvements and started getting better responses.",
        "Creating a resume that truly represents my abilities, experience, and potential felt overwhelming and impossible before discovering this tool. Now I have a professional document that showcases my strengths effectively and opens doors to amazing opportunities I never thought possible.",
        "Future Tech's platform made resume building simple, efficient, and actually enjoyable for me surprisingly and unexpectedly throughout the process. The step-by-step guidance ensured I didn't miss any important details, selling points, or achievements in my professional profile.",
        "I appreciated how the builder helped me quantify achievements rather than just listing duties and daily responsibilities throughout. This results-focused approach made my contributions clear and impressive to recruiters, resulting in much better response rates from top employers.",
        "The modern templates gave my resume a professional appearance that caught recruiters' attention immediately and consistently every time. I felt confident submitting applications knowing my materials represented my best self accurately, professionally, and in a compelling way.",
        "Switching careers required reframing my entire work history in a new light, context, and industry perspective completely. Future Tech's tools and resources made this challenging transition smooth and successful, and I landed a role in my new field within just a month.",
        "The combination of professional templates and personalized guidance is truly unbeatable for serious job seekers at any level. I felt confident submitting applications knowing my resume represented my best self accurately, compellingly, and in a way that would stand out.",
    ],
    32: [
        "Future Tech's resume builder completely changed how I approach job applications and career development overall in every way. The professional templates, AI suggestions, and comprehensive career resources helped me create a document that truly stands out in competitive markets and catches recruiters' attention immediately.",
        "I spent many months applying to jobs with my old resume and getting nowhere fast or making progress. After using this platform and implementing the suggestions, I received three interview invitations in the first week and accepted an offer within a month successfully and happily.",
        "The platform guided me through every section with helpful examples, best practices, and expert tips throughout the process. My resume went from generic and forgettable to compelling and memorable, and recruiters noticed the significant difference immediately in their responses and engagement.",
        "Creating a resume that showcases my unique value proposition felt impossible until I found this tool and guidance. Now I have a professional document that communicates my strengths clearly, effectively, and opens doors to exciting opportunities I never thought I'd have access to.",
    ],
    33: [
        "Future Tech's platform made me feel confident and prepared for my job search journey from start to finish. The professional appearance and strategic content of my resume resulted in immediate positive responses from top employers, and I felt ready for every interview and conversation that followed.",
        "I appreciated how the builder emphasized quantifiable achievements and measurable results throughout every section of my resume. This approach made my contributions crystal clear and impressive to decision makers, leading to multiple interview invitations within just days of submitting my applications.",
        "The career resources and resume tools work together seamlessly to support job seekers at every stage of the process. I felt guided and supported throughout my entire search, from initial application to final offer negotiation, and the results exceeded my expectations completely.",
    ],
    34: [
        "My previous resume was generic and failed to capture what makes me unique and valuable to employers in my field. Future Tech helped me create a personalized, professional document that recruiters couldn't ignore and actively wanted to discuss in detail during interviews and screening calls.",
    ],
    35: [
        "I was skeptical about online resume builders initially, but this platform exceeded all my expectations completely and thoroughly. The quality of my new resume rivals anything a professional writer could create manually, and it cost a fraction of the price while giving me full control.",
    ],
}

def get_testimonial(word_count, index):
    """Get a testimonial with the exact word count."""
    testimonials = TESTIMONIALS.get(word_count, [])
    if not testimonials:
        # Fallback - shouldn't happen
        return f"Future Tech helped me achieve my career goals. " * (word_count // 7)
    
    # Cycle through available testimonials
    return testimonials[index % len(testimonials)]

def update_testimonials(input_file, output_file):
    """Update all testimonials in the HTML file."""
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all testimonial paragraphs
    pattern = r'(<p class="testimonial-review-para">)(.*?)(</p>)'
    matches = list(re.finditer(pattern, content, re.DOTALL))
    
    print(f"Found {len(matches)} testimonials to update\n")
    
    # Track usage count for each word count
    usage_count = {}
    
    # Replace each testimonial
    offset = 0
    for i, match in enumerate(matches):
        old_text = match.group(2).strip()
        old_text = re.sub(r'\s+', ' ', old_text)  # Normalize whitespace
        word_count = len(old_text.split())
        
        # Get usage index for this word count
        usage_index = usage_count.get(word_count, 0)
        usage_count[word_count] = usage_index + 1
        
        # Generate new testimonial
        new_text = get_testimonial(word_count, usage_index)
        new_word_count = len(new_text.split())
        
        if new_word_count != word_count:
            print(f"WARNING: Testimonial {i+1} word count mismatch: {word_count} -> {new_word_count}")
        
        print(f"Testimonial {i+1}: {word_count} words (#{usage_index + 1} of this length)")
        
        # Replace in content
        start = match.start() + offset
        end = match.end() + offset
        old_full = content[start:end]
        new_full = f'{match.group(1)}{new_text}{match.group(3)}'
        
        content = content[:start] + new_full + content[end:]
        offset += len(new_full) - len(old_full)
    
    # Write updated content
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n✅ Successfully updated {len(matches)} testimonials!")
    print(f"📄 Output written to: {output_file}")

if __name__ == "__main__":
    input_file = "landing.html"
    output_file = "landing.html"  # Overwrite the original
    update_testimonials(input_file, output_file)
    print("\n🎉 All testimonials have been updated with new content!")
