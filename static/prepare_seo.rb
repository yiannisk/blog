require 'rubygems'
require 'json'
require 'net/http'

url = 'http://ioanniskaradimas.info/app_v2/entry/search/allposts'
response = Net::HTTP.get_response(URI.parse(url))
data = response.body
results = JSON.parse(data)
pages = []
page_url_base = 'http://ioanniskaradimas.info/#!post.';

pages.push({
	:url => "http://ioanniskaradimas.info/#!profile",
	:file => "profile.html",
	:contents_length => 1,
	:change_freq => 'monthly',
	:lastmod => Time.now.strftime("%Y-%m-%d"),
	:priority => 0.8
}, {
	:url => "http://ioanniskaradimas.info/",
	:file => "home.html",
	:contents_length => 1,
	:change_freq => 'daily',
	:lastmod => Time.now.strftime("%Y-%m-%d"),
	:priority => 0.9
})

results.each do |item|
	pages.push({
		:url => "#{page_url_base}#{item['code']}",
		:file => "#{item['code']}.html",
		:contents_length => item['contents'].length,
		:change_freq => 'daily',
		:lastmod => Time.now.strftime("%Y-%m-%d"),
		:priority => 0.8
	})
end

File.open("sitemap.xml", "w") do |sitemap|
	sitemap.puts "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
	
	sitemap.puts <<-eos
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
	eos

	# create static pages and sitemap.
	pages.each do |page|
		next if page[:contents_length] == 0
		
		# add sitemap entry. 
		sitemap.puts "<url><loc>#{page[:url]}</loc><lastmod>#{page[:lastmod]}</lastmod><changefreq>#{page[:change_freq]}</changefreq><priority>#{page[:priority]}</priority></url>"
		
		# create static page.
		puts "#{page[:file]}: #{page[:url]}, contents length: #{page[:contents_length]}"
		phantom_status = 
			`phantomjs generator.js #{page[:url]} #{page[:file]}`
		puts phantom_status
	end
	
	sitemap.puts "</urlset>"
end
