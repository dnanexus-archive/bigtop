#!/usr/env Python

# nonhuman_JSON_setup.py
#
# USAGE: python nonhuman_JSON_setup.py infile.tsv
#
# Normally, you'd use the SNP_info_retriever.py to set up the JSON from a TSV file.  However, what if your data
# is from a source that's not human, and thus doesn't have rsIDs for identification?
#
# This script can help with non-human data.  It takes input in the following structure:
#
#	chromosome	chr_position	p-value 				allele frequency
#	1			1178			1.61836446771225e-11	0.0868263473053892
#
# This information is converted to JSON format.
#
# NOTE: The chromosome counts and lengths noted below are for rice (Oryza sativa).  If the counts and lengths
# are different for your organism, change it below, in lines 23 and 24!

# imports
import sys, os, math

# describing chromosome lengths and total

############## UPDATE THIS FOR YOUR ORGANISM OF CHOICE ##############
chr_names_list = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
chr_lengths_list = [43270923, 35937250, 36413819, 35502694, 29958434, 31248787, 29697621, 28443022, 23012720, 23207287, 29021106, 27531856]

total = sum(chr_lengths_list)

# functions
def convert_to_polar(line):
	splitline = line.strip().split(",")
	chr_num = splitline[0]
	chr_pos = splitline[1]
	allele_freq = splitline[3]
	pval = splitline[2]
	dist_from_genome_start = int(chr_pos)

	if chr_num in chr_names_list:
		position = chr_names_list.index(chr_num)
		while position >= 0:
			position -= 1
			if position >= 0:
				dist_from_genome_start += chr_lengths_list[position]
#			dist_from_genome_start += spacer
	else:
		position = ""
	# reduce to polar (between 0 and 2pi - math.pi)
	sigma = float(dist_from_genome_start) / total * 2 * math.pi - (math.pi / 2)
	# CHANGING THE SCALE TO BE BETWEEN 100-1,000 #
	r = (float(allele_freq) * 900) + 100
	y_polar = float(pval)
	return r, sigma, y_polar

def convert_to_cartesian(r, sigma, y_polar):
	x = r * math.cos(sigma)
	y = -math.log10(y_polar)
	z = r * math.sin(sigma)
	return x, y, z

infile = open(sys.argv[1], "r")
outfile = open(sys.argv[1][:-4] + ".coords.json", "w")

outfile.write("[\n")
for line in infile:
	try:
		if line.split("\t")[0] != "MarkerName":
			if line.split("\t")[1] != "No_info":
				if "?" not in line:
					polar_coords = convert_to_polar(line)
					cartesian_coords = convert_to_cartesian(polar_coords[0], polar_coords[1], polar_coords[2])

					split = line.strip().split(",")
					outfile.write(
						"\t{\n" +
						"\t\t\"id\": \"" + "chr" + split[0] + "-" + split[1] + "\",\n" +
						"\t\t\"gene\": \"" + "NA" + "\",\n" +
						"\t\t\"coords\": [" + ",".join([
							str(cartesian_coords[0]),
							str(cartesian_coords[1]),
							str(cartesian_coords[2])
						]) + "],\n" +
						"\t\t\"chr\": \"chr" + split[0] + "\",\n" +
						"\t\t\"location\": " + str(split[1]) + ",\n" +
						"\t\t\"frequency\": " + str(split[3]) + ",\n" +
						"\t\t\"p\": " + str(split[2]) + "\n\t},\n"
					)
	except IndexError:
		print line
		print "Exited with error on above line."
		sys.exit()
outfile.write("]\n")

print "Successfully converted to Cartesian coordinates."
infile.close()
outfile.close()
