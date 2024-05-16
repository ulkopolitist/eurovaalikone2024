var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as readFile from './raw-data-from-CSV.js';
import * as readCandidates from './answers-from-raw-data.js';
import * as createDataWrapper from './create-main-data-wrapper.js';
import * as questions from './fetch-questions.js';
import * as dom from './create-question-dom.js';
import * as minmax from './get-minmax-gap-points.js';
import * as radio from './add-button-interactivity.js';
import * as metadata from './populate-metadata.js';
import * as intro from './create-question-intros.js';
import * as questionModal from './create-question-dom-modal.js';
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var debugSettings, dataFile, metadataFile, programData, _a, _b, data, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    debugSettings = {
                        enabled: false
                    };
                    debugOutput("DEBUG OUTPUT: ", debugSettings);
                    dataFile = './data/final/upt-vaalikone-2024-final-data-16_05_2024_v3.csv';
                    metadataFile = './data/final/2024-meta-2.csv';
                    programData = createDataWrapper.createDataWrapper();
                    debugOutput(navigator.userAgent + "-- ", debugSettings);
                    navigator.userAgent.search("Mac") > 1 ? debugOutput("MÄKKIKONE", debugSettings) : debugOutput("EI OOO MÄK", debugSettings);
                    debugOutput(" --create datawrapper", debugSettings);
                    // Load candidate raw data
                    _a = programData;
                    return [4 /*yield*/, readFile.readRawDataFromCSV(dataFile)];
                case 1:
                    // Load candidate raw data
                    _a.answerRawData = _e.sent();
                    debugOutput(" -read data", debugSettings);
                    // Load candidate metadata
                    _b = programData;
                    return [4 /*yield*/, readFile.readRawDataFromCSV(metadataFile)];
                case 2:
                    // Load candidate metadata
                    _b.candidateMetadata = _e.sent();
                    debugOutput(" -read meta", debugSettings);
                    data = programData.answerRawData;
                    _c = programData;
                    return [4 /*yield*/, readCandidates.getCandidateAnswersFromRawData(data, programData.answerOptionTexts)];
                case 3:
                    _c.candidates = _e.sent();
                    _d = programData;
                    return [4 /*yield*/, metadata.populateCandidateMetadata(programData.candidates, programData.candidateMetadata)];
                case 4:
                    _d.candidates = _e.sent();
                    debugOutput(" -populate meta", debugSettings);
                    // Sort Candidates by 1. party-membership, 2. surname
                    debugOutput(" -start alpha & party sort", debugSettings);
                    navigator.userAgent.search("Mac") > 1 ? programData.candidates.sort(sortCandidatesMac) : programData.candidates.sort(sortCandidatesPC);
                    debugOutput(" -sort", debugSettings);
                    // Set independent array for sorted candidates
                    programData.partySortedCandidates = programData.candidates.map(function (candidate) {
                        return candidate;
                    });
                    // Fetch question list
                    programData.questions = questions.fetchQuestions(programData.candidates[0].answers);
                    debugOutput(" -questions", debugSettings);
                    // Render questions to HTML for user to answer
                    dom.createQuestionDOM(programData.questions);
                    debugOutput(" -render quest", debugSettings);
                    // Add answerable radio buttons to question list
                    radio.createHTMLRadioButtonInteractivity(programData.questions.length, programData.answerOptionTexts.length, programData.user.answers, programData.checkIfAllQuestionsAnswered);
                    debugOutput(" -radio", debugSettings);
                    // Add intro texts & pictures to questions
                    intro.createQuestionIntros();
                    debugOutput(" -question intro", debugSettings);
                    // Render all candidates to Browse Modal
                    questionModal.createQuestionDomBrowseModal(programData.candidates);
                    debugOutput(" -create dom-", debugSettings);
                    // Get resemblance value calculation min & max points
                    programData.minmaxDifferenceGaps = minmax.getMinMaxDifferenceGaps(programData.questions.length, programData.answerOptionTexts.length);
                    debugOutput(" -minmax-", debugSettings);
                    $("#show-more-candidates-button").hide();
                    $("#show-results-button").css("cursor", "not-allowed");
                    // WHEN ALL LOADED, SHOW UI & HIDE LOADER ANIMATION
                    $("#loading-text").hide();
                    $(".hide-before-onload").show();
                    debugOutput(" -READY!", debugSettings);
                    return [2 /*return*/];
            }
        });
    });
}
function sortCandidatesMac(a, b) {
    if (String(a.party) == String(b.party)) {
        return getSurname(String(a.name)) > getSurname(String(b.name));
    }
    else {
        return String(a.party) > String(b.party);
    }
}
function sortCandidatesPC(a, b) {
    return String(a.party).localeCompare(String(b.party)) || getSurname(String(a.name)).localeCompare(getSurname(String(b.name)));
}
function getSurname(fullName) {
    var splittedName = fullName.split(" ");
    splittedName.shift();
    return String(splittedName);
}
function debugOutput(text, debugSettings) {
    if (debugSettings.enabled) {
        // $( "#testing-testing" ).append( "<br>" + text );
    }
}
main();
