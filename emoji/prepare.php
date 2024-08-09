<?php

$rawData = file_get_contents('./all_emojis.json');
$rawData = json_decode($rawData);

$data = [];
$added = [];

foreach ($rawData as $entry) {
    if ($entry->category_name == "Component") {
        continue;
    }

    if (!array_key_exists($entry->category_name, $data)) {
        $data[$entry->category_name] = [];
    }

    $ekey = $entry->en_tts_description ?? $entry->name;
    $ekey = explode(':', $ekey)[0];
    $ekey = str_replace(['medium-dark', 'medium-light', 'light', 'medium', 'dark'], "", $ekey);

    if (!array_key_exists($ekey, $added)) {
        $data[$entry->category_name][] = $entry->characters;
        $added[$ekey] = true;
    }
}

$translations = [
    "Smileys & Emotion" => "شکلک ها و احساسات",
    "People & Body" => "مردم و بدن",
    // "Component" => "جزء",
    "Animals & Nature" => "حیوانات و طبیعت",
    "Food & Drink" => "غذا و نوشیدنی",
    "Travel & Places" => "سفر و مکان ها",
    "Activities" => "فعالیت ها",
    "Objects" => "اشیاء",
    "Symbols" => "نمادها",
    "Flags" => "پرچم ها",
];

foreach ($translations as $key => $value) {
    $data[$value] = $data[$key];
    unset($data[$key]);
}

// flat the result for using in virtual scroll



// store result
$result = json_encode($data, JSON_UNESCAPED_UNICODE);
file_put_contents(__DIR__ . '/emojis.json', $result);
